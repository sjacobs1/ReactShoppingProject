import { Link } from 'react-router-dom'
import { Product } from '../model/product'
import { formatToTwoDecimals } from '../utils/formatPriceToTwoDecimals'
import { useProductState } from '../store/productState'
import { FiShoppingBag } from 'react-icons/fi'
import { useCartStore } from '../store/cartState'

type ProductCardProps = {
  product: Product
  className?: string
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const setSelectedItemId = useProductState((state) => state.setSelectedItemId)
  const addItemToCart = useCartStore((state) => state.addItemToCart)

  const handleSelectedItem = () => {
    setSelectedItemId(product.id)
  }

  const handleAddItemToCart = (event: React.MouseEvent) => {
    event.preventDefault()
    addItemToCart(product.id)
  }

  return (
    <Link to="productOverview" onClick={handleSelectedItem}>
      {
        <div
          className={`card card-compact bg-white w-44 shadow-xl cursor-pointer ${className}`}
        >
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

            <div className="flex justify-between">
              <p className="font-bold text-black">{`$${formatToTwoDecimals(
                product.price
              )}`}</p>
              <button className="btn btn-sm" onClick={handleAddItemToCart}>
                {<FiShoppingBag />}
              </button>
            </div>
          </div>
        </div>
      }
    </Link>
  )
}

export default ProductCard

