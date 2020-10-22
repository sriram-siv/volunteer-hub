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
  border-radius: 3px;
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
  transition: all 0
`

class InputField extends React.Component {

  state = {
    value: '',
    focus: false
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }
  handleFocus = () => {
    this.setState({ focus: true })
  }
  handleBlur = () => {
    this.setState({ focus: false })
  }

  render() {
    const { value, focus } = this.state
    const { label, width } = this.props
    return (
      <Wrapper width={width} onFocus={this.handleFocus} onBlur={this.handleBlur}>
        <Input value={value} onChange={this.handleChange} spellCheck="false" />
        <Label focus={focus || value}>{label}</Label>
        <Highlight focus={focus} />
      </Wrapper>
    )
  }
}

export default InputField