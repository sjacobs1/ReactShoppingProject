import { Outlet } from 'react-router-dom'
import TopNav from './TopNav'

const Layout = () => {
  return (
    <>
      <TopNav />
      <Outlet />
    </>
  )
}

export default Layout
