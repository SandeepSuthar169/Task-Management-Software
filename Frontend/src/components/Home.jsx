import React from 'react'
// import Cards from './Pages/Cards.js'
import Footer from './Pages/Footer.jsx'
import HeroSection from './Pages/HeroSection.jsx'
import Navbar from './Pages/Navbar.jsx'
import Line from './Pages/Line.jsx'
import SecoundHeroSection from './Pages/SecoundHeroSection.jsx'

function Home() {
  return (
    <>
      <div>
        <Navbar/>
        <HeroSection/>
        <SecoundHeroSection/>
        <Line/>
        <Footer/>
      </div>
    </>

  )
}

export default Home