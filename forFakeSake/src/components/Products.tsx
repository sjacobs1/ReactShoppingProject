import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../service/getAllProducts'
import ProductCard from './ProductCard'

const Products = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })

  if (isPending) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="flex flex-wrap gap-4 bg-white">
      {data.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  )
}

export default Products
