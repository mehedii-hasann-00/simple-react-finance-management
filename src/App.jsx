import { useState,useContext } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router'

function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0B1020] dark:text-white">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
