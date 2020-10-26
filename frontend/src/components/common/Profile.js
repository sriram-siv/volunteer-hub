import React from 'react'

import { getSingleProfile } from '../../lib/api'

class Profile extends React.Component {

  state = {
    userData: null
  }

  componentDidMount =  async () => {
    const userID = localStorage.getItem('user_id')
    const response = await getSingleProfile(userID)
    console.log(response.data)
    this.setState({ userData: response.data })
  }

  render() {
    return (
      'get list of skills'
    )
  }
}

export default Profile