import React from 'react'
import styled from 'styled-components'

// background-color: #eeed;
// color: #333;
const ButtonElement = styled.button`
  display: block;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border-radius: 2px;
  width: ${props => props.width};
  margin: auto;
  height: 3.1rem;
  border: 2px solid #fef15e;
  transition: all 0.15s;

  &:hover {
    background-color: #fef15eef;
    color: #333;
  }
`

const Button = ({ width, label, onClick }) => {
  return <ButtonElement width={width} onClick={onClick}>{label}</ButtonElement>
}

export default Button