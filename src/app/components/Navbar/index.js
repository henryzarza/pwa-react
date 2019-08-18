import React from 'react'

import logo from '../../assets/logo.svg';

import './style.css';

function Navbar() {
  return (
    <nav className="navbar">
      <img className="logo" src={logo} alt="DC comics" />
      <a href="https://www.google.com/" className="link">Star Hero</a>
    </nav>
  )
}

export default Navbar;
