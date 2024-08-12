import { Link } from 'react-router-dom'
import { formatToTwoDecimals } from '../utils/formatPriceToTwoDecimals'
import { useCartStore } from '../store/cartState'
import { useProductState } from '../store/productState'
import { calculateCartTotal } from '../utils/calculateCartTotalPrice'
import { MdDelete } from 'react-icons/md'

export const Cart = () => {
  const {
    cartItems,
    removeItemFromCart,
    clearCart,
    increaseItemQuantity,
    decreaseItemQuantity,
  } = useCartStore()

  const items = useProductState((state) => state.items)

  if (cartItems.length === 0) {
    return (
      <div>
        <p>Your cart is empty</p>
        <Link to="/">View Products</Link>
      </div>
    )
  }

  const cartTotal = calculateCartTotal(cartItems, items)

  return (
    <div className="p-4">
      {cartItems.map(({ productId, quantity }) => {
        const item = items.find((item) => item.id === productId)
        const totalItemPrice = (item?.price ?? 0) * quantity
        const isLastItem =
          cartItems[cartItems.length - 1].productId === productId

        return (
          <div key={item?.id}>
            <div className="flex py-4">
              <img className="h-24 w-24" src={item?.image} alt={item?.title} />
              <div className="ml-4 flex-1">
                <div className="flex flex-col md:grid md:grid-cols-3 md:justify-between">
                  <div>
                    <h2 className="card-title text-gray-500">{item?.title}</h2>
                  </div>

                  <div className="mb-4 text-gray-500 md:flex md:flex-col md:items-center">
                    <p>Quantity: {quantity}</p>
                    <div className="flex space-x-2 mt-2">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => decreaseItemQuantity(productId)}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => increaseItemQuantity(productId)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => removeItemFromCart(productId)}
                      >
                        <MdDelete className="text-red-700" />
                      </button>
                    </div>
                  </div>

                  <div className="text-black md:flex md:flex-col md:items-end pr-5">
                    <p>{`$${formatToTwoDecimals(totalItemPrice)}`}</p>
                  </div>
                </div>
              </div>
            </div>
            {!isLastItem && <div className="divider"></div>}
          </div>
        )
      })}
      <div className="mt-4 bg-gray-100 p-2 rounded-lg flex justify-between items-center">
        <h2 className="text-lg font-bold text-black">
          Cart Total: ${formatToTwoDecimals(cartTotal)}
        </h2>
        <button
          className="btn border border-red-700 bg-red-700 text-white"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>
    </div>
  )
}

export default Cart
