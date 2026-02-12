import React from 'react'
import Footer from './Footer.jsx'
import HeroSection from './HeroSection.jsx'
import Navbar from './Navbar.jsx'


function Home() {
  return (
    <>
      <div>
        <Navbar/>
        <HeroSection/>
        <Footer/>
      </div>
    </>

  )
}

export default Home