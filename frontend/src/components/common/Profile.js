import React from 'react'
import styled from 'styled-components'

import BannerImage from '../elements/BannerImage'

import { getSingleProfile, getAllSkills } from '../../lib/api'

const Wrapper = styled.div`
  height: calc(100vh - 3rem);
  overflow-y: scroll;
  background-color: papayawhip;
`



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
      <Wrapper>
        <BannerImage/>
      </Wrapper>
    )
  }
}

export default Profile