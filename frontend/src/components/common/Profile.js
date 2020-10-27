import React from 'react'
import styled from 'styled-components'

import BannerImage from '../elements/BannerImage'

import { getSingleProfile, getAllSkills } from '../../lib/api'

const Wrapper = styled.div`
  position: relative;
  height: calc(100vh - 3rem);
  overflow-y: scroll;
  background-color: papayawhip;
`

const ProfilePic = styled.img`
  position: absolute;
  top: 70px;
  left: 50px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid red;
`

const Username = styled.h1`
  position: absolute;
  top: 150px;
  left: calc(50% + 50px);
  transform: translate(-50%, -50%);
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
        <BannerImage>
          <ProfilePic src='https://mondrian.mashable.com/lead-img-anti-racist-curriculum.jpg' />
          <Username>volunteer55</Username>
        </BannerImage>
      </Wrapper>
    )
  }
}

export default Profile