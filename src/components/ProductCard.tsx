import { Link } from 'react-router-dom'
import { Product } from '../model/product'
import { formatToTwoDecimals } from '../utils/formatPriceToTwoDecimals'
import { useProductState } from '../store/productState'
import { FiCheck, FiShoppingBag } from 'react-icons/fi'
import { useCartStore } from '../store/cartState'

type ProductCardProps = {
  product: Product
  className?: string
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const setSelectedItemId = useProductState((state) => state.setSelectedItemId)
  const addItemToCart = useCartStore((state) => state.addItemToCart)
  const cartItems = useCartStore((state) => state.cartItems)
  const isInCart = (productId: number) =>
    cartItems.some((item) => item.productId === productId)

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
          className={`card card-compact bg-white w-44 cursor-pointer ${className}`}
        >
          <figure>
            <img
              className="h-48 w-36 mt-2"
              src={product.image}
              alt={product.title}
            />
          </figure>

          <div className="card-body">
            <p>
              <span className="text-gray-500">{`★${product.rating.rate}`}</span>
              <span className="ml-1 text-gray-500">{`(${product.rating.count})`}</span>
            </p>
            <p className="truncate text-gray-500">{product.title}</p>

            <div className="flex justify-between">
              <p className="font-bold text-black">{`$${formatToTwoDecimals(
                product.price
              )}`}</p>

              <button
                className={`btn btn-sm ${
                  isInCart(product.id)
                    ? 'bg-slate-700 text-white'
                    : 'bg-white text-black'
                } flex items-center`}
                onClick={handleAddItemToCart}
              >
                {isInCart(product.id) ? (
                  <>
                    <FiCheck className="mr-2" />
                    <FiShoppingBag />
                  </>
                ) : (
                  <>
                    <span className="mr-2">+</span>
                    <FiShoppingBag />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      }
    </Link>
  )
}

export default ProductCard
