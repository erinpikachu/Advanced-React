/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // 1. Query the current user and see of they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // 2. Query the current cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id, quantity',
  });

  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    // 3. See if the current item is in their cart
    // 4. if it is incriment by 1
    return await context.lists.CartItem.updateOne({
        id: existingCartItem.id,
        data: { quantity: existingCartItem.quantity + 1 },
      });
  }
  // 4. if it isn't, create a new cart item
  return await context.lists.CartItem.createOne({
    data: { 
        product: { connect: { id: productId } },
        user: { connect: { id: sesh.itemId }} 
    },
  });
  
}

export default addToCart;
