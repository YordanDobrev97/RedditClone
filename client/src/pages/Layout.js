import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <>
      <Navbar />
      <h2>Hello</h2>     
      <Outlet />
    </>
  )
}

export default Layout