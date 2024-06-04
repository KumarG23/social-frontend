import { Link } from 'react-router-dom';
import Logo from './assets/logo.jpeg'

import React from 'react'

export const Header = () => {
  return (
    <nav id='navbar' className='navbar navbar-expand-md navbar-light sticky-top nav-bar'>
        <div className='container d-flex flex-row'>
        <img src={Logo} alt='Logo' className='rounded float-start' id='logo'/>
        <span className='mx-auto fs-1 fw-bold' id='profile'>Social</span>
        <div className='navbar-nav'>
        <Link to='/' className='nav-item nav-link' id='navitem'>Home</Link>
        <Link to='/login' className='nav-item nav-link' id='navitem'>Login</Link>
        <Link to='/profile' className='nav-item nav-link' id='navitem'>Profile</Link>
        </div>
        </div>
    </nav>
  )
}

export default Header
