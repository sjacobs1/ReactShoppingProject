import { Link } from 'react-router-dom'
import { formatToTwoDecimals } from '../utils/formatPriceToTwoDecimals'
import { useCartStore } from '../store/cartState'

export const Cart = () => {
  const cartItems = useCartStore((state) => state.getCartItems())

  if (cartItems.length === 0) {
    return (
      <div>
        <p>Your cart is empty</p>
        <Link to="/">View Products</Link>
      </div>
    )
  }

  return (
    <div>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="card card-compact bg-white w-full shadow-xl mb-4"
        >
          <div className="flex">
            <img className="h-24 w-24" src={item.image} alt={item.title} />
            <div className="ml-4">
              <h2 className="card-title">{item.title}</h2>
              <p>{`$${formatToTwoDecimals(item.price)}`}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cart
