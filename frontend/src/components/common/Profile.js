import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'

import BannerImage from '../elements/BannerImage'
import Button from '../elements/Button'
import InputText from '../elements/InputText'

import { getSingleProfile, getAllSkills } from '../../lib/api'
import Schedule from '../elements/Schedule'
import  {MemberDetail } from '../common/PendingList'

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
    userData: {
      username: null,
      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      profile_image: null
    },
    pendingUserData: {
      username: null,
      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      profile_image: null
    },
    skills: null,
    formData: {
      user_skills: null,
      schedule: Array.from({ length: 14 }).fill(false)
    },
    editMode: false
  }

  componentDidMount = async () => {
    this.getProfile()
    this.getSkills()
  }
  
  getProfile = async () => {
    const userID = localStorage.getItem('user_id')
    const response = await getSingleProfile(userID)
    const userData = {
      username: response.data.username,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      email: response.data.email,
      phone: response.data.phone,
      profile_image: response.data.profile_image
    }
    console.log(userData)
    
    const formData = { ...this.state.formData, user_skills: response.data.user_skills }
    
    this.setState({ userData, pendingUserData: userData, formData }, () => console.log(this.state.formData)) 
  }

  handleEditMode = () => {
    this.setState({ editMode: !this.state.editMode })
  }

  handleEditChange = (event) => {
    const pendingUserData = {
      ...this.state.pendingUserData,
      [event.target.name]: event.target.value
    }
    this.setState({ pendingUserData })
  }

  saveEdits = () => {
    console.log('time to save edits to db')
    
    this.handleEditMode()
  }

  discardEdits = () => {
    this.setState({ pendingUserData: this.state.userData })
    this.handleEditMode()
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
    const { userData, pendingUserData, skills, editMode } = this.state
    const { schedule } = this.state.formData

    const selectStyles = {
      control: styles => ({
        ...styles,
        backgroundColor: this.props.theme.background,
        borderRadius: '2px',
        borderColor: this.props.theme.shadow,
        height: 'calc(2rem)'
      }),
      singleValue: (styles) => ({
        ...styles,
        color: this.props.theme.text,
        fontWeight: this.props.theme.fontWeight,
        letterSpacing: this.props.theme.letterSpacing,
        fontSize: '0.85rem'
      })
    }

    if (!this.state.formData.user_skills) return null

    const user_skills = this.state.formData.user_skills.map(skill => ({ value: skill.id, label: skill.name }))

    return (
      <Wrapper>
        <BannerImage>
          <ProfilePic src={userData.profile_image} />
          <Username>{userData.username}</Username>
        </BannerImage>
        <Schedule handleClick={this.editSchedule} schedule={schedule} />
        <Select value={user_skills} options={skills} isMulti onChange={this.editSkills}/>
        <button onClick={app.logout}>Logout</button>
        <button>save</button>
        {!editMode &&
          <div>
            <MemberDetail>{userData.first_name}</MemberDetail>
            <MemberDetail>{userData.last_name}</MemberDetail>
            <MemberDetail>{userData.email}</MemberDetail>
            <MemberDetail>{userData.phone}</MemberDetail>
            <Button onClick={this.handleEditMode} label='Edit'></Button>
          </div>}
        {editMode &&
          <div>
            <InputText name='first_name' value={pendingUserData.first_name} label='First Name'  returnValue={this.handleEditChange}></InputText>
            <InputText name='last_name' value={pendingUserData.last_name} label='Last Name' returnValue={this.handleEditChange}></InputText>
            <InputText name='email' value={pendingUserData.email} label='Email' returnValue={this.handleEditChange}></InputText>
            <InputText name='phone' value={pendingUserData.phone} label='Phone' returnValue={this.handleEditChange}></InputText>
            <Button onClick={this.saveEdits} label='Save'></Button>
            <Button onClick={this.discardEdits} label='Cancel'></Button>
          </div>

        }
      </Wrapper>
    )
  }
}

export default Profile