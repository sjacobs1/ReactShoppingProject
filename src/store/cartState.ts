import { create } from 'zustand'
import { Product } from '../model/product'

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  cartItems: CartItem[]
  addItemToCart: (product: Product) => void
  getCartItems: () => CartItem[]
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],

  addItemToCart: (product) => {
    const { cartItems } = get()
    const existingItem = cartItems.find((item) => item.id === product.id)

    if (existingItem) {
      set({
        cartItems: cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      })
    } else {
      set({
        cartItems: [...cartItems, { ...product, quantity: 1 }],
      })
    }
  },

  getCartItems: () => {
    return get().cartItems
  },
}))