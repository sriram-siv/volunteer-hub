import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  width: ${props => props.width || '100%'};
  margin: auto;
`

const Input = styled.textarea`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border-radius: 2px;
  /* height: 4rem; */
  height: ${props => props.height ? props.height : '4rem'};
  width: 100%;
  font-size: 0.85rem;
  font-weight: ${props => props.theme.fontWeight};
  letter-spacing: ${props => props.theme.letterSpacing};
  border: 1px solid ${props => props.theme.shadow};
  padding: 8px 10px;
  margin-bottom: -7px;
  resize: none;
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
top: ${props => props.focus ? '.2px' : '0.8rem'};
display: ${props => props.focus && props.hideLabel ? 'none' : 'block'};
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
  bottom: 0;
  left: 1px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  transition: all 0;
`

/** my documentation for this class */
// Add docstring to say that returnValue and name must always be provided
const InputArea = ({ name, value, width, returnValue, label, height, hideLabel, submit }) => {

  const [shiftActive, setShiftActive] = React.useState(0)
  const [hasFocus, setHasFocus] = React.useState(false)

  const keyDown = event => {
    if (event.key === 'Shift') setShiftActive(shiftActive + 1)
    if (event.key === 'Enter' && !shiftActive && submit) submit(event)
  }

  const keyUp = event => {
    if (event.key === 'Shift') setShiftActive(shiftActive - 1)
  }

  return (
    <Wrapper
      width={width}
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
    >
      <Input
        name={name}
        value={value}
        onChange={returnValue}
        onKeyDown={keyDown}
        onKeyUp={keyUp}
        height={height}
      />
      <Label focus={hasFocus || value} hideLabel={hideLabel}>{label}</Label>
      <Highlight focus={hasFocus} />
    </Wrapper>
  )

}

export default InputArea