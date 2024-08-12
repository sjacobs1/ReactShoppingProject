import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartState'
import { useProductState } from '../store/productState'
import { formatToTwoDecimals } from '../utils/formatPriceToTwoDecimals'
import { calculateCartTotal } from '../utils/calculateCartTotalPrice'

const TopNav = () => {
  const { cartItems } = useCartStore()
  const items = useProductState((state) => state.items)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = calculateCartTotal(cartItems, items)

  return (
    <div className="navbar bg-slate-700 flex justify-between">
      <div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <Link to="more">Ask us a question</Link>
          </ul>
        </div>
      </div>
      <div>
        <Link to="/" className="btn btn-ghost text-xl text-white">
          For Fake's Sake
        </Link>
      </div>

      <div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {totalItems}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-slate-700 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold text-white">
                {totalItems} Items
              </span>
              <span className="text-info">
                Subtotal: ${formatToTwoDecimals(cartTotal)}
              </span>
              <div className="card-actions">
                <Link to="cart" className="btn btn-black btn-block">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNav
