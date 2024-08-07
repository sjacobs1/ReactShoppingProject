import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
      <h1>Page Not Found</h1>
      <Link to="/" className="text-blue-500">
        Get back to shopping
      </Link>
    </>
  )
}

export default ErrorPage
