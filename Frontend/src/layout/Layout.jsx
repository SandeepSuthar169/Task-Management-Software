// components/Layout.jsx
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
      <nav>Your Navbar Here</nav>
      <Outlet /> {/* child routes render here */}
    </div>
  )
}

export default Layout