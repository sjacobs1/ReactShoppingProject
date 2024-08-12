import { Product } from '../model/product'

export const findBestProduct = (
  products: Product[] | undefined,
  selectedCategory: string | null
): Product | null => {
  if (!selectedCategory || !products) return null

  const filteredProducts = products.filter(
    (item) => item.category === selectedCategory
  )

  if (filteredProducts.length === 0) return null

  return filteredProducts.reduce((best, current) => {
    const bestScore = best.rating.rate * best.rating.count
    const currentScore = current.rating.rate * current.rating.count
    return currentScore > bestScore ? current : best
  })
}
