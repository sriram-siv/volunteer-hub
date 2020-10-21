import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {

  state = {
    roomName: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <>
        <input type="text" name="roomName" value={this.state.roomName} onChange={this.handleChange} />
        <Link to={`/chat/${this.state.roomName}`} >Go</Link>
      </>
    )
  }
}

export default Home