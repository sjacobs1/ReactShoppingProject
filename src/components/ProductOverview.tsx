import { Product } from '../model/product'
import { CiShoppingTag } from 'react-icons/ci'
import { FiShoppingBag } from 'react-icons/fi'

type ProductOverviewProps = {
  product: Product
}

const ProductOverview = ({ product }: ProductOverviewProps) => {
  return (
    <div className="card card-compact bg-white shadow-xl cursor-pointer">
      <figure>
        <img className="" src={product.image} alt={product.title} />
      </figure>

      <div className="card-body gap-1">
        <p>
          <span className="text-gray-500">{`★${product.rating.rate}`}</span>
          <span className="ml-1">{`(${product.rating.count})`}</span>
        </p>
        <p className="text-gray-500">{product.title}</p>
        <p className="font-bold text-black">{`$${product.price}`}</p>
      </div>

      <div className="flex ml-4 gap-1">
        <CiShoppingTag />
        <div className="badge badge-outline">{product.category}</div>
      </div>

      <div className="card-body">
        <p className="text-gray-500">{product.description}</p>
      </div>

      <div className="flex justify-end p-2">
        <button className="btn">{<FiShoppingBag />}Add to cart</button>
      </div>
    </div>
  )
}

export default ProductOverview
