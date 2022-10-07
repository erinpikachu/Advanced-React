import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells applo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // Read the nuber of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMet?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // if there are items
      // AND there aren't enough item to satify fhow many were requested
      // AND we are on the last page
      // Just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we dont have any items we must go to the next work to get them
        return false;
      }

      // if there are items, just return them from the cache, and we don't need to go to the network
      if (items.length) {
        return items;
      }

      return false; // fallback to network

      // first thing it does is ask the read funtion for those items
      // We can either do one of two things
      // First things we can do is return the items because they are already in the cache
      // The other thing we can do is return false from here, (network request)
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // this runs when the applo client comes back from the network with our product
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
