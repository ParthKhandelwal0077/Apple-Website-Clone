import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import './index.css'

const App = () => {
  return (
   <main className="bg-black">
    <NavBar/>
    <Hero/>
    <Highlights/>
  
   </main>
  )
}

export default App
