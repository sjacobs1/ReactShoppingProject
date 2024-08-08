export const Cart = () => {
  return (
    <div className="card shadow-xl flex flex-col gap-2 bg-gray-100">
      <ul className="flex flex-col gap-2">
        <li className="bg-base-200 grid grid-cols-3 gap-4 p-4 font-bold">
          <div className="flex items-center">
            <h2>Item</h2>
          </div>
          <div className="flex items-center justify-center">
            <h2>Quantity</h2>
          </div>
          <div className="flex items-center justify-end">
            <h2>Item Total</h2>
          </div>
        </li>
      </ul>
      <div className="divider"></div>
      <div className="flex justify-end p-4 text-black">Cart Total:</div>
    </div>
  )
}

export default Cart
