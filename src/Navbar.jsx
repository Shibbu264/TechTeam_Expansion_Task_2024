import React from 'react'
import logo from './assets/logo.png';
import './Navbar.css'

const navbar = () => {
  return (
    <div className='nav'>
      <img src={logo} alt="logo" />
    </div>
  )
}

export default navbar