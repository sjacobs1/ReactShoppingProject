import { Link } from 'react-router-dom'

const TopNav = () => {
  return (
    <div className="flex justify-between">
      <Link to="/">Shop</Link>
      <Link to="cart">Cart</Link>
    </div>
  )
}

export default TopNav
