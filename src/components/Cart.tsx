import { Link } from 'react-router-dom'
import { formatToTwoDecimals } from '../utils/formatPriceToTwoDecimals'
import { useCartStore } from '../store/cartState'
import { useProductState } from '../store/productState'

export const Cart = () => {
  const cartItems = useCartStore((state) => state.getCartItems())
  const items = useProductState((state) => state.items)
  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart)
  const clearCart = useCartStore((state) => state.clearCart)
  const increaseItemQuantity = useCartStore(
    (state) => state.increaseItemQuantity
  )
  const decreaseItemQuantity = useCartStore(
    (state) => state.decreaseItemQuantity
  )

  if (cartItems.length === 0) {
    return (
      <div>
        <p>Your cart is empty</p>
        <Link to="/">View Products</Link>
      </div>
    )
  }

  let cartTotal = 0

  return (
    <div>
      {cartItems.map(({ productId, quantity }) => {
        const item = items.find((item) => item.id === productId)
        const totalItemPrice = (item?.price ?? 0) * quantity
        const isLastItem =
          cartItems[cartItems.length - 1].productId === productId
        cartTotal += totalItemPrice

        return (
          <div key={item?.id}>
            <div className="flex py-4">
              <img className="h-24 w-24" src={item?.image} alt={item?.title} />
              <div className="ml-4 flex-1">
                <h2 className="card-title">{item?.title}</h2>
                <p>{`$${formatToTwoDecimals(totalItemPrice)}`}</p>
                <p>Quantity: {quantity}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => increaseItemQuantity(productId)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => decreaseItemQuantity(productId)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => removeItemFromCart(productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            {!isLastItem && <div className="divider"></div>}
          </div>
        )
      })}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-bold">
          Cart Total: ${formatToTwoDecimals(cartTotal)}
        </h2>
      </div>
      <button className="btn btn-danger mt-4" onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  )
}

export default Cart
