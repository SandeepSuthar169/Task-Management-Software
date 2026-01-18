import React from 'react'
import Cards from './Ui/Cards.jsx'
import Footer from './share/Footer.jsx'
import HeroSection from './Ui/HeroSection.jsx'
import Navbar from './share/Navbar.jsx'


function Home() {
  return (
    <>
      <div>
        <Navbar/>
        <HeroSection/>
        <Cards/>
        <Footer/>
      </div>
    </>

  )
}

export default Home