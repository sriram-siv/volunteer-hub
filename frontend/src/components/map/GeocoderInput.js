import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  width: ${props => props.width};
  margin: auto;
`

const Input = styled.input`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border-radius: 2px;
  height: 3.1rem;
  width: 100%;
  font-size: 1rem;
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

// This could be a simple component to convert to functional with hooks
class GeocoderInput extends React.Component {

  state = {
    focus: false
  }

  toggleFocus = () => {
    this.setState({ focus: !this.state.focus })
  }

  render() {
    const { focus } = this.state
    const { label, width, inputProps, setRef, value, onChange } = this.props

    return (
      <Wrapper width={width} onFocus={this.toggleFocus} onBlur={this.toggleFocus}>
        <Input ref={ref => setRef(ref)} {...inputProps} spellCheck="false" onChangeCapture={onChange} value={value} />
        <Label focus={focus || value}>{label}</Label>
        <Highlight focus={focus} />
      </Wrapper>
    )
  }
}

export default GeocoderInput