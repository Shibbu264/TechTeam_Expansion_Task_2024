import React from 'react'
import logo from './assets/logo.png';
import './Navbar.css'

const navbar = () => {
  return (
    <div className='flex justify-center items-center max-w-full h-[15vh] bg-white'>
      <img className='w-[100px] p-[5px] lg:w-[130px]' src={logo} alt="logo" />
    </div>
  )
}

export default navbar