import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../service/getAllProducts'
import ProductCard from './ProductCard'
import { useProductState } from '../store/productState'
import { useEffect, useState } from 'react'
import { Product } from '../model/product'
import { findBestProduct } from '../utils/findBestProduct'
import { Category } from '../model/category'
import { getAllCategories } from '../service/getAllCategories'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [bestProduct, setBestProduct] = useState<Product | null>(null)
  
  const { isPending, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  })

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value
    setSelectedCategory(category === 'all' ? null : category)
  }

  const handleFindBestProduct = () => {
    const best = findBestProduct(data, selectedCategory)
    setBestProduct(best)
  }

  const setItems = useProductState((state) => state.setItems)

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data, setItems]);

  const filteredProducts = selectedCategory
    ? data?.filter((item) => item.category === selectedCategory)
    : data

  if (isPending) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="flex justify-center gap-1">
          <label className="text-gray-700">Filter:
          <select
            className="select bg-white text-black m-2"
            onChange={handleCategoryChange}
            defaultValue=""
          >
            <option value="" disabled>
              Categories
            </option>
            <option value="all">All</option>
            {categories?.map((category) => (
              <option
                key={category.name}
                value={category.name}
                className="text-lg"
              >
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </option>
            ))}
          </select>
          </label>
        </div>

        <div className="flex justify-center mb-2">
          {selectedCategory && selectedCategory !== 'all' && (
            <div className="flex">
              <p onClick={handleFindBestProduct} className="text-gray-500 cursor-pointer">
                focus best product
              </p>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-circle btn-ghost btn-xs text-info"
                >
                  <svg
                    tabIndex={0}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div
                  tabIndex={0}
                  className="card compact dropdown-content bg-base-100 rounded-box z-[1] w-64 shadow"
                >
                  <div tabIndex={0} className="card-body">
                    <h2 className="card-title">Best In Category</h2>
                    <p>
                      Click on "focus best product" to highlight the best rated
                      product in the category. This is determined by the rating
                      and number of ratings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center flex-wrap gap-4 px-4 pb-4 bg-slate-200">
          {filteredProducts?.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              className={
                bestProduct?.id === item.id ? 'border-2 border-slate-700' : ''
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products
