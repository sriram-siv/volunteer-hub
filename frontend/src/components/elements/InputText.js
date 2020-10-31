import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  width: ${props => props.width};
  margin: auto;
`

const Input = styled.input`
  background-color: ${props => props.theme.background};
  color: ${props => props.focus ? props.theme.text : 'transparent'};
  border-radius: 2px;
  height: 3.1rem;
  width: 100%;
  font-size: 1rem;
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

class InputField extends React.Component {

  state = {
    focus: false
  }

  handleChange = event => {
    this.props.returnValue(event)
  }
  handleFocus = () => {
    this.setState({ focus: true })
  }
  handleBlur = () => {
    this.setState({ focus: false })
  }

  render() {
    const { focus } = this.state
    const { label, width, value, name, type, error } = this.props
    return (
      <Wrapper width={width} onFocus={this.handleFocus} onBlur={this.handleBlur}>
        <Input ref={input => this.input = input} focus={focus || value} type={type} name={name} value={value} onChange={this.handleChange} spellCheck="false" />
        <Label focus={focus || value}>{label}</Label>
        <Error>{error}</Error>
        <Highlight focus={focus} />
      </Wrapper>
    )
  }
}

export default InputField