import React from 'react'
import styled from 'styled-components'

// import { AppContext } from '../../App'

const Wrapper = styled.div`
  position: relative;
  width: ${props => props.width || '100%' };
  margin: auto;
`

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
    outline: ${props => props.tabbed ? '2px solid ' + props.theme.panels : 'none'};
    border-color: ${props => props.tabbed ? props.theme.focus : props.theme.shadow};
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
  background-color: ${props => props.tabbed ? props.theme.focus : props.theme.primary};
  position: absolute;
  bottom: 1px;
  left: 1px;
  border-bottom-left-radius: ${props => props.focus ? 0 : '2px'};
  border-bottom-right-radius: ${props => props.focus ? 0 : '2px'};
  transition: all 0;
`

const Error = styled.div`
  position: absolute;
  top: 6px;
  right: 11px;

  color: ${props => props.theme.name === 'light' ? '#c00000' : 'palevioletred'};
  font-size: 0.7rem;

  pointer-events: none;
  text-transform: lowercase;
`

const InputField = ({ label, width, value, name, type, error, returnValue }) => {

  const [focus, setFocus] = React.useState(false)
  const [tabbed, setTabbed] = React.useState(false)

  const checkFocusVisible = event => {
    // Prevent setting value when typing input
    if (tabbed) return
    setTabbed(event.key === 'Tab')
  }

  return (
    <Wrapper
      width={width}
      onKeyUpCapture={checkFocusVisible}
      onBlurCapture={() => setTabbed(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <Input
        focus={focus || value}
        tabbed={tabbed}
        type={type}
        name={name}
        value={value}
        onChange={returnValue}
        onFocus={checkFocusVisible}
        spellCheck="false"
      />
      <Label focus={focus || value}>{label}</Label>
      <Error>{error}</Error>
      <Highlight focus={focus} tabbed={tabbed}/>
    </Wrapper>
  )
}

export default InputField