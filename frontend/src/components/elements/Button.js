import styled from 'styled-components'

export default styled.button`
  /* display: block; */
  background-color: ${props => props.primary ? props.theme.primary : props.theme.panels};
  color: ${props => props.primary ? '#333' : props.theme.text};
  border-radius: 2px;
  width: ${props => props.width};
  margin: auto;
  height: 3rem;
  border: 2px solid #fef15e;
  transition: background-color 0.15s;
  font-family: 'Montserrat Alternates', sans-serif;

  &:hover {
    background-color: ${props => props.theme.primary};
    color: #333;
  }
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 2px solid blue;
  }
`