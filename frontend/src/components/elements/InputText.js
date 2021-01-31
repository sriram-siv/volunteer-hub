import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  width: ${props => props.width || '100%' };
  margin: auto;
`
// TODO implement focus visible
const Input = styled.input`
  background-color: ${props => props.theme.panels};
  color: ${props => props.theme.text};
  border-radius: 2px;
  height: 3.1rem;
  width: 100%;
  font-weight: ${props => props.theme.fontWeight};
  border: 1px solid ${props => props.theme.shadow};
  padding: calc(12px + 0.7rem) 10px 5px;
  &:focus {
    outline: none;
  }
  ::selection {
    background-color: ${props => props.theme.primary};
    color: #444;
  }
  `
  
const Label = styled.div`
  position: absolute;
  top: ${props => props.focus ? '6px' : '0.8rem'};
  left: 11px;
  color: ${props => props.theme.text};
  font-size: ${props => props.focus ? '0.7rem' : '1rem'};
  font-weight: ${props => props.theme.fontWeight};
  letter-spacing: ${props => props.theme.letterSpacing};
  pointer-events: none;
`

const Highlight = styled.div`
  height: ${props => props.focus ? '3px' : 0};
  width: calc(100% - 2px);
  background-color: ${props => props.theme.primary};
  position: absolute;
  bottom: 1px;
  left: 1px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  transition: all 0;
`

const Error = styled.div`
  position: absolute;
  top: 6px;
  right: 11px;
  color: palevioletred;
  font-size: 0.7rem;
  font-weight: ${props => props.theme.fontWeight};
  letter-spacing: ${props => props.theme.letterSpacing};
  pointer-events: none;
  text-transform: lowercase;
`

const InputField = ({ label, width, value, name, type, error, returnValue }) => {

  const [focus, setFocus] = React.useState(false)

  return (
    <Wrapper width={width} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
      <Input
        focus={focus || value}
        type={type} name={name}
        value={value}
        onChange={returnValue}
        spellCheck="false"
      />
      <Label focus={focus || value}>{label}</Label>
      <Error>{error}</Error>
      <Highlight focus={focus} />
    </Wrapper>
  )
}

export default InputField