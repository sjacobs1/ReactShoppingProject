import { create } from 'zustand'
import { Product } from '../model/product'

interface ProductState {
  items: Product[]
  setItems: (items: Product[]) => void
  selectedItemId: number | null
  setSelectedItemId: (id: number | null) => void
  getSelectedItem: () => Product | undefined
}

export const useProductState = create<ProductState>((set, get) => ({
  items: [],
  setItems: (items) => set({ items }),
  selectedItemId: null,
  setSelectedItemId: (id: number | null) => set({ selectedItemId: id }),
  getSelectedItem: () => {
    const { items, selectedItemId } = get()
    return items.find((item) => item.id === selectedItemId)
  },
}))
