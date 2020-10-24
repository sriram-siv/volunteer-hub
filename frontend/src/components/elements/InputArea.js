import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  width: ${props => props.width};
  margin: auto;
`

const Input = styled.textarea`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border-radius: 2px;
  height: 4rem;
  width: 100%;
  font-size: 0.85rem;
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

class InputField extends React.Component {

  /* Add docstring to say that returnValue and name must always be provided */

  state = {
    shiftPressed: 0,
    focus: false
  }

  handleChange = event => {
    this.props.returnValue({ name: this.props.name, value: event.target.value })
  }
  handleFocus = () => {
    this.setState({ focus: true })
  }
  handleBlur = () => {
    this.setState({ focus: false })
  }
  keyDown = event => {
    if (event.keyCode === 16) this.setState({ shiftPressed: this.state.shiftPressed + 1 })
    if (event.keyCode === 13 && !this.state.shiftPressed) {
      this.props.submit(event)
    }
  }
  keyUp = event => {
    if (event.keyCode === 16) this.setState({ shiftPressed: this.state.shiftPressed - 1 })
  }

  render() {
    const { focus } = this.state
    const { name, value, width, returnValue } = this.props
    return (
      <Wrapper width={width} onFocus={this.handleFocus} onBlur={this.handleBlur}>
        <Input
          ref={input => this.input = input}
          name={name} value={value}
          onChange={returnValue}
          onKeyDown={this.keyDown}
          onKeyUp={this.keyUp}
        />
        <Highlight focus={focus} />
      </Wrapper>
    )
  }
}

export default InputField