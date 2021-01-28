/* eslint-disable camelcase */
import React from 'react'
import { withRouter } from 'react-router-dom'
import styled, { withTheme } from 'styled-components'

import { getSingleProfile, updateProfile, getAllSkills, updateProfileShifts, updateProfileSkills } from '../../lib/api'
// import icons from '../../lib/icons'
// import styles from '../../lib/styles'
import { update } from '../../lib/helper'

// import Button from '../elements/Button'
import Show from '../common/Show'
import CampaignCard from '../elements/CampaignCard'
import UserDetails from './UserDetails'

const NewCampaign = styled.button`
  position: relative;
  top: -15px;
  color: ${props => props.theme.text};
  font-family: 'Open Sans', sans-serif;
  float: right;
  border: none;
  background-color: transparent;
`

class Profile extends React.Component {
  
  state = {
    userData: null,
    pendingUserData: null,
    userCampaigns: [],
    skills: null,

    user_skills: [],
    schedule: [],
    editMode: false,
    section: { label: 'profile', value: 'profile' },
  }

  componentDidMount = () => {
    this.getProfile()
    this.getSkills()
  }
  
  getProfile = async () => {
    const userID = localStorage.getItem('user_id')
    const { data } = await getSingleProfile(userID)

    const userData = [
      'username', 'first_name', 'last_name', 'email', 'phone', 'profile_image'
    ].reduce((obj, prop) => ({ ...obj, [prop]: data[prop] }), {})

    const userCampaigns = [
      'owned_campaigns', 'coord_campaigns', 'conf_campaigns'
    ].reduce((arr, prop) => [...arr, ...data[prop]], [])

    const userShifts = data.user_shifts.reduce((arr, { id }) => [...arr, id], [])
    const schedule = Array.from({ length: 14 }, (val, i) => userShifts.includes(++i))
    
    this.setState({
      userData,
      pendingUserData: userData,
      userCampaigns,
      user_skills: data.user_skills,
      schedule
    }) 
  }

  getSkills = async () => {
    const { data } = await getAllSkills()
    const skills = data.map(skill => ({ value: skill.id, label: skill.name }))
    this.setState({ skills })
  }

  // TODO move this to helper library
  showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      { 
        cloudName: 'dmhj1vjdf',
        uploadPreset: 'jisx4gi0',
        showUploadMoreButton: false
      },
      (error, result) => {
        if (result?.event === 'success') { 
          const pendingUserData = { ...this.state.pendingUserData, profile_image: result.info.url }
          this.setState({ pendingUserData })
        }
      })
    widget.open()
  }

  toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode,
      pendingUserData: this.state.userData
    })
  }

  handleEditProfile = (event) => {
    const pendingUserData = {
      ...this.state.pendingUserData,
      [event.target.name]: event.target.value
    }
    this.setState({ pendingUserData })
  }

  saveProfile = async () => {
    const { currentUser, setNotification } = this.props.app
    try {

      await updateProfile(currentUser(), this.state.pendingUserData)

      this.setState(
        { userData: this.state.pendingUserData },
        this.toggleEditMode
      )

      setNotification({ message: 'your profile has been updated' })
    } catch (err) {
      setNotification({ message: err.response.data })
    }
  }

  editSchedule = slot => {
    const { schedule: prev } = this.state
    const schedule = update(prev, slot, !prev[slot])
    this.setState({ schedule })
  }

  editSkills = skills => {
    const user_skills = 
      skills?.map(skill => ({ id: skill.value, name: skill.label })) || []
    
    this.setState({ user_skills })
  }

  saveSettings = async () => {
    const { user_skills, schedule } = this.state
    // const { currentUser, setNotification } = this.props.app
    const { setNotification } = this.props.app

    try {
      // TODO BACKEND check if this works - does backend care if id is number or string
      const userID = localStorage.getItem('user_id')
      const skillIds = user_skills.map(skill => skill.id)

      await updateProfileShifts(userID, { schedule })
      await updateProfileSkills(userID, { 'user_skills': skillIds })

      setNotification({ message: 'your preferences have been updated' })
    } catch (err) {
      setNotification({ message: 'there was an error updating your details' })
    }
  }

  changeSection = section => {
    if (section.value === 'logout') this.props.app.logout()
    else this.setState({ section })
  }

  render() {
    const { history } = this.props
    const { userData, userCampaigns, skills, section, schedule, user_skills, editMode } = this.state

    const menu = {
      options: [
        'profile', 'campaigns', 'settings', 'logout'
      ].map(str => ({ label: str, value: str })),
      value: section,
      onChange: this.changeSection
    }

    if (!userData) return null

    return (
      <Show
        title={`${userData.first_name} ${userData.last_name}`}
        menu={menu}
        banner={require('../../images/default_banner_profile.jpg')}
        image={require('../../images/default_profile.png')}
        imageLabel="change profile image"
        onImageClick={this.showWidget}
      >

        {section.value === 'profile' &&
          <UserDetails
            editInfo={this.toggleEditMode}
            userData={userData}
            userSkills={user_skills}
            skills={skills}
            schedule={schedule}
            editSkills={this.editSkills}
            editSchedule={this.editSchedule}
          />
        }

        {section.value === 'campaigns' && <>
          <NewCampaign onClick={() => history.push('/campaigns/new')}>New Campaign</NewCampaign>

          {userCampaigns.map((campaign, i) => (
            <CampaignCard key={i} campaign={campaign} onClick={history.push} />))}
        </>}

        {section.value === 'settings' && <>
      
        </>}

      </Show>
    )
  }
}

export default withTheme(withRouter(Profile))