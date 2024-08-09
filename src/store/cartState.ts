import { create } from 'zustand'

interface CartItem {
  productId: number
  quantity: number
}

interface CartState {
  cartItems: CartItem[]
  addItemToCart: (productId: number) => void
  getCartItems: () => CartItem[]
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],

  addItemToCart: (productId) => {
    const { cartItems } = get()
    const existingItem = cartItems.find((item) => item.productId === productId)

    if (existingItem) {
      set({
        cartItems: cartItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      })
    } else {
      set({
        cartItems: [...cartItems, { productId, quantity: 1 }],
      })
    }
  },

  getCartItems: () => {
    return get().cartItems
  },
}))
