import React from 'react'
// import { Link } from 'react-router-dom'

import Landing from './Landing'
import Profile from './Profile'

class Home extends React.Component {

  state = {
    roomName: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount = () => {
    const userId = localStorage.getItem('user_id')
    if (userId){
      this.props.history.push('/profile')
    }
  }

  render() {

    const { loggedIn } = this.state

    return (
      <>
        <Landing />
      </>
    )
  }
}

export default Home