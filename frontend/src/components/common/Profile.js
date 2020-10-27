import React from 'react'

import { getSingleProfile, getAllSkills } from '../../lib/api'

class Profile extends React.Component {

  state = {
    userData: null,
    skills: null
  }

  componentDidMount = async () => {
    this.getProfile()
    this.getSkills()
  }
  
  getProfile = async () => {
    const userID = localStorage.getItem('user_id')
    const response = await getSingleProfile(userID)
    this.setState({ userData: response.data }) 
  }

  getSkills = async () => {
    const response = await getAllSkills()
    console.log(response.data)
  }

  render() {

    return (
      'get list of skills'
    )
  }
}

export default Profile