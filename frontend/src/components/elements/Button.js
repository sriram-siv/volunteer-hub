import React from 'react'

const Button = ({ text, style, handleClick }) => {
  return (
    <button className="btn btn-outline-primary" style={style} onClick={handleClick} >{text}</button>
  )
}

export default Button