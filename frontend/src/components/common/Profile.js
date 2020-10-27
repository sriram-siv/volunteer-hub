import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'

import BannerImage from '../elements/BannerImage'

import { getSingleProfile, getAllSkills } from '../../lib/api'
import Schedule from '../elements/Schedule'

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
    skills: null,
    formData: {
      user_skills: null,
      schedule: Array.from({ length: 14 }).fill(false)
    }
  }

  componentDidMount = async () => {
    this.getProfile()
    this.getSkills()
  }
  
  getProfile = async () => {
    const userID = localStorage.getItem('user_id')
    const response = await getSingleProfile(userID)
    
    const formData = { ...this.state.formData, user_skills: response.data.user_skills }
    
    this.setState({ userData: response.data, formData }, () => console.log(this.state.formData)) 
  }

  getSkills = async () => {
    const response = await getAllSkills()
    const skills = response.data.map(skill => ({ value: skill.id, label: skill.name }))
    this.setState({ skills })
  }

  editSchedule = slot => {
    const schedule = [...this.state.formData.schedule]
    schedule[slot] = !schedule[slot]
    const formData = { ...this.state.formData, schedule }
    this.setState({ formData })
  }

  editSkills = skills => {
    const user_skills = skills
      ? skills.map(skill => ({ id: skill.value, name: skill.label }))
      : []
    console.log(user_skills)
    const formData = { ...this.state.formData, user_skills }
    this.setState({ formData })
  }

  render() {
    const { app } = this.props
    const { skills } = this.state
    const { schedule } = this.state.formData

    if (!this.state.formData.user_skills) return null

    const user_skills = this.state.formData.user_skills.map(skill => ({ value: skill.id, label: skill.name }))

    return (
      <Wrapper>
        <BannerImage>
          <ProfilePic src='https://mondrian.mashable.com/lead-img-anti-racist-curriculum.jpg' />
          <Username>volunteer55</Username>
        </BannerImage>
        <Schedule handleClick={this.editSchedule} schedule={schedule} />
        <Select value={user_skills} options={skills} isMulti onChange={this.editSkills}/>
        <button onClick={app.logout}>Logout</button>
        <button>save</button>
      </Wrapper>
    )
  }
}

export default Profile