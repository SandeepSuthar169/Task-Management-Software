import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Pages/Navbar.jsx'
import Footer from '../Pages/Footer.jsx'

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  )
}

export default Layout