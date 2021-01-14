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

/** my oducmentation for this class */
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
    const { name, value, width, returnValue, label, height, hideLabel } = this.props
    return (
      <Wrapper width={width} onFocus={this.handleFocus} onBlur={this.handleBlur}>
        <Input
          ref={input => this.input = input}
          name={name} value={value}
          onChange={returnValue}
          onKeyDown={this.keyDown}
          onKeyUp={this.keyUp}
          height={height}
        />
        <Label focus={focus || value} hideLabel={hideLabel}>{label}</Label>
        <Highlight focus={focus} />
      </Wrapper>
    )
  }
}

export default InputField