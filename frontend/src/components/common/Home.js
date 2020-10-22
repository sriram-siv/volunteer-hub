import React from 'react'
// import { Link } from 'react-router-dom'

import Landing from './Landing'

class Home extends React.Component {

  state = {
    roomName: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const auth = false
    return (
      <>
        {auth
          ? 'You are logged in!'
          : <Landing />
        }
      </>
    )
  }
}

export default Home