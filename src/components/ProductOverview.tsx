import { CiShoppingTag } from 'react-icons/ci'
import { FiCheck, FiShoppingBag } from 'react-icons/fi'
import { useProductState } from '../store/productState'
import { useCartStore } from '../store/cartState'
import { IoArrowBack } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const ProductOverview = () => {
  const getSelectedItem = useProductState((state) => state.getSelectedItem)
  const product = getSelectedItem()
  const cartItems = useCartStore((state) => state.cartItems)
  const isInCart = (productId: number) =>
    cartItems.some((item) => item.productId === productId)

  const addItemToCart = useCartStore((state) => state.addItemToCart)

  const handleAddItemToCart = () => {
    if (product) addItemToCart(product.id)
  }

  if (!product) {
    return <div>Product could not be found</div>
  }

  return (
    <div>
      <Link to="/">
        <div className="flex ml-4 gap-1 pt-4 text-gray-500">
          <IoArrowBack />
          <div>Go Back</div>
        </div>
      </Link>

      <div className="p-4 flex justify-center">
        <div className="card card-compact bg-white shadow-xl cursor-pointer max-w-4xl">
          <figure>
            <img className="h-96" src={product.image} alt={product.title} />
          </figure>

          <div className="card-body gap-1">
            <div className="flex">
              <p>
                <span className="text-gray-500 w">{`★${product.rating.rate}`}</span>
                <span className="ml-1">{`(${product.rating.count})`}</span>
              </p>
              <div className="flex ml-4 gap-1">
                <CiShoppingTag />
                <div className="badge badge-outline">{product.category}</div>
              </div>
            </div>
            <p className="text-gray-500">{product.title}</p>
            <p className="font-bold text-black">{`$${product.price}`}</p>
          </div>

          <div className="card-body">
            <p className="text-gray-500">{product.description}</p>
          </div>

          <div className="flex justify-end p-2">
            <button
              className={`btn ${
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
                  <span className="mr-2">Add To Cart</span>
                  <FiShoppingBag />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductOverview
