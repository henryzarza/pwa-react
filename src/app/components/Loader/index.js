import React from 'react'

import './style.css';

function Loader() {
  return (
    <div className="container-loader">
      <div className="loader" />
      <span className="loader-text">Loading...</span>
    </div>
  )
}

export default Loader;
