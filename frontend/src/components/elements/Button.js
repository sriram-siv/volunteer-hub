import React from 'react'
import styled from 'styled-components'

// background-color: #eeed;
// color: #333;
const ButtonElement = styled.button`
  background-color: #111d;
  color: #ddd;
  border-radius: 3px;
  width: 100%;
  height: 3rem;
  border: 1px solid #aeb4ba;
  transition: all 0.15s;

  &:hover {
    background-color: #ff0e;
  }
`

const Button = () => {
  return <ButtonElement>search</ButtonElement>
}

export default Button