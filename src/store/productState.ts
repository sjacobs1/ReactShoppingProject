import { create } from 'zustand'
import { Product } from '../model/product'

interface ProductState {
  selectedItem: Product | null
  setSelectedItem: (product: Product | null) => void
}

export const useProductState = create<ProductState>((set) => ({
  selectedItem: null,
  setSelectedItem: (product: Product | null) => set({ selectedItem: product }),
}))
