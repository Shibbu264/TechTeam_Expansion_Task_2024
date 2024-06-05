import React from 'react'
import logo from './assets/logo.png';
import './Navbar.css'

const navbar = () => {
  return (
    <nav className='flex justify-center items-center max-w-full h-[15vh] bg-white'>
      <img className='w-[150px] p-[5px] lg:w-[180px]' src={logo} alt="logo" />
    </nav>
  )
}

export default navbar