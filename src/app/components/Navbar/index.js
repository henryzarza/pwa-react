import React from 'react'

import logo from '../../assets/logo.svg';

import './style.css';

function Navbar() {
  return (
    <nav className="navbar">
      <img className="logo" src={logo} alt="DC comics" />
      <span className="navbar-text">Heroes</span>
    </nav>
  )
}

export default Navbar;
