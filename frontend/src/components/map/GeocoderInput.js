import React from 'react'
import styled from 'styled-components'

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


const GeocoderInput = ({ label, width, inputProps, setRef, value, onChange }) => {

  const [focus, setFocus] = React.useState(false)
  const [tabbed, setTabbed] = React.useState(true)

  const handleBlur = () => {
    setFocus(false)
    setTabbed(true)
  }


  return (
    <Wrapper
      width={width}
      onFocus={() => setFocus(true)}
      onBlur={handleBlur}
      onClick={() => setTabbed(false)}
    >
      <Input
        ref={ref => setRef(ref)}
        {...inputProps}
        spellCheck="false"
        onChangeCapture={onChange}
        value={value}
        tabbed={tabbed}
      />
      <Label focus={focus || value}>{label}</Label>
      <Highlight focus={focus} tabbed={tabbed} />
    </Wrapper>
  )
}

export default GeocoderInput