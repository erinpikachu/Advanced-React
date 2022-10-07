/* eslint-disable */
import { list } from '@keystone-next/keystone/schema';
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput, OrderCreateInput } from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';

const graphql = String.raw;

async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1. Make sutre they are signed in
  const userId = context.session.itemId;
  if(!userId) {
    throw new Error('Sorry you must be igned in to create an order!')
  }
  // 1.5 Qurty the current user
  const user = await context.lists.User.findOne({
    where: {id: userId},
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          id
          name
          price
          description
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }

        }
      }
    `
  })
  console.dir(user, { depth: null })
  // 2. Calculate the total price
  const cartItems = user.cart.filter(cartItem => cartItem.product);
  const amount = cartItems.reduce( function(tally: number, cartItem: CartItemCreateInput) {
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
  // 3. Create the charge with the stripe library
  const charge = await stripeConfig.paymentIntents.create({
    amount,
    currency: 'USD',
    confirm: true,
    payment_method: token,
  }).catch(err => {
    console.log(err);
    throw new Error(err.message);
  });
  console.log(charge);
  // 4. Convert the cart items to order items 
  const orderItems = cartItems.map(cartItem => {
    return {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quality,
      photo: { connect: { id: cartItem.product.photo.id } }
    }
  });
  // 5. Create the order and return it
  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId }}
    }
  });
  // 6. clean up old cart items 
  const cartItemIds = user.cart.map(cartItem => cartItem.id);
  await context.lists.CartItem.deleteMany({
    ids: cartItemIds
  });

  return order;
  
}

export default checkout;
