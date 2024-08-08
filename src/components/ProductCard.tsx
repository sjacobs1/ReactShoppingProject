import { Link } from 'react-router-dom'
import { Product } from '../model/product'
import { formatToTwoDecimals } from '../utils/formatPriceToTwoDecimals'
import { useProductState } from '../store/productState'

type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const setSelectedItem = useProductState((state) => state.setSelectedItem)

  const handleSelectedItem = () => {
    setSelectedItem(product)
  }

  return (
    <Link to="productOverview" onClick={handleSelectedItem}>
      {
        <div className="card card-compact bg-white w-44 shadow-xl cursor-pointer">
          <figure>
            <img
              className="h-48 w-36"
              src={product.image}
              alt={product.title}
            />
          </figure>

          <div className="card-body">
            <p>
              <span className="text-gray-500">{`★${product.rating.rate}`}</span>
              <span className="ml-1">{`(${product.rating.count})`}</span>
            </p>
            <p className="truncate text-gray-500">{product.title}</p>
            <p className="font-bold text-black">{`$${formatToTwoDecimals(
              product.price
            )}`}</p>
          </div>
        </div>
      }
    </Link>
  )
}

export default ProductCard
