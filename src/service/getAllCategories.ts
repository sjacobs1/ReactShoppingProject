import { Category } from '../model/category'

export async function getAllCategories(): Promise<Category[]> {
  const response = await fetch('https://fakestoreapi.com/products/categories')
  const data = await response.json()
  return data.map((category: string) => ({ name: category }))
}
