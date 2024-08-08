import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../service/getAllProducts'
import ProductCard from './ProductCard'
import { useProductState } from '../store/productState'

const Products = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })

  const setItems = useProductState((state) => state.setItems)

  if (isPending) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  setItems(data)

  return (
    <div className="flex flex-wrap gap-4 bg-white">
      {data.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  )
}

export default Products
