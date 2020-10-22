import React from 'react'

class Tests extends React.Component {

  state = {
    inputValue: '',
    focus: false
  }

  containerStyle = {
    position: 'relative',
    width: '200px',
    margin: 'auto'
  }

  inputStyle = {
    backgroundColor: '#444',
    color: '#bbb',
    borderRadius: '3px',
    marginTop: '10px',
    height: '3.5rem',
    fontSize: '1rem',
    paddingTop: '20px'
  }

  placeholderStyle = {
    position: 'absolute',
    top: '16px',
    left: '13px',
    color: '#999'
  }
  placeholderStyleFocus = {
    position: 'absolute',
    top: '7px',
    left: '13px',
    fontSize: '0.7rem',
    color: '#999'
  }

  highlightStyle = {
    height: '3px',
    width: 'calc(100% - 2px)',
    backgroundColor: '#fef715',
    position: 'absolute',
    bottom: '1px',
    left: '1px',
    borderBottomLeftRadius: '2px',
    borderBottomRightRadius: '2px'
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  handleFocus = () => {
    this.setState({ focus: true })
  }
  handleBlur = () => {
    if (!this.state.value) this.setState({ focus: false })
  }


  render() {
    const { value, focus } = this.state
    return (
      <div style={this.containerStyle}>
        <input type="text" className="form-control test" style={this.inputStyle} value={value} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} />
        
        {!focus && <div style={this.placeholderStyle}>location</div>}
        {focus && <div style={this.placeholderStyleFocus}>location</div>}

        {focus && <div className="test-highlight" />}
      </div>
    )
  }
}

export default Tests