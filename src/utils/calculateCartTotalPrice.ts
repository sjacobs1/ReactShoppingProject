import { Product } from '../model/product'
import { CartItem } from '../store/cartState'

export const calculateCartTotal = (
  cartItems: CartItem[],
  products: Product[]
): number => {
  return cartItems.reduce((total, cartItem) => {
    const product = products.find((item) => item.id === cartItem.productId)
    return total + (product?.price ?? 0) * cartItem.quantity
  }, 0)
}