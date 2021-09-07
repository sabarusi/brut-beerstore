export const CART_ACTIONS = {ADD:'add', 
                            REMOVE:'remove',
                            INCREMENT:'increment',
                            DECREMENT:"decrement",
                            CLEAR:'clearAll'} 

export const cartMap = {
                        add:addToCart,
                        remove:removeFromCart,
                        increment:incrementItem,
                        decrement:decrementItem,
                        clearAll:()=>([])
                        }

function addToCart(cart, item){
  const notInCart = cart.some(element => element.pid === item.pid)
  return !notInCart ? [...cart, {...item, quantity:1}] : cart 
}
function removeFromCart(cart, item){
  return cart.filter(element => element.pid !== item.pid)
}
function decrementItem(cart, item){
    return cart.map(product => product.pid === item.pid ? {...product, quantity: product.quantity-1} 
                                                        :  product)
               .filter(product => product.quantity !== 0)
}
function incrementItem(cart, item){
    return cart.map(product => product.pid === item.pid ? {...product, quantity: product.quantity+1} 
                                                        :  product)
}