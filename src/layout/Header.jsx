import React from 'react'
import "./styles/header.css"

const Header = () => {
  return (
    <header className='header'>
      <img className='header_img' src={"/img/img_pokedex.png"} alt="" />
      <div className='header-black'></div>
      <div className="header-circle">
        <div className='header-circle_int' ></div>
      </div>

    </header>
  )
}

export default Header