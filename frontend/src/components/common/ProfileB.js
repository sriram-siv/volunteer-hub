/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import styled, { withTheme } from 'styled-components'

import { getSingleProfile, updateProfile, getAllSkills, updateProfileShifts, updateProfileSkills } from '../../lib/api'
import { AppContext } from '../../App'
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
const Profile  = () => {
  
  const app = useContext(AppContext)
  const { userID, setNotification, logout } = app

  const history = useHistory()

  const [ userData, setUserData ] = useState(null)
  const [ pendingUserData, setPendingUserData ] = useState(null)
  const [ userCampaigns, setUserCampaigns ]  = useState([])
  const [ skills, setSkills ] = useState(null)
  const [ user_skills, setUserSkills ] = useState([])
  const [ schedule, setSchedule ] = useState([])
  const [ editMode, setEditMode ] = useState(false)
  const [ section, setSection ] = useState({ label: 'profile', value: 'profile' })

  const getProfile = async () => {
    const userID = localStorage.getItem('id')
    const { data } = await getSingleProfile(userID)
  
    const userData = [
      'username', 'first_name', 'last_name', 'email', 'phone', 'profile_image'
    ].reduce((obj, prop) => ({ ...obj, [prop]: data[prop] }), {})
  
    const userCampaigns = [
      'owned_campaigns', 'coord_campaigns', 'conf_campaigns'
    ].reduce((arr, prop) => [...arr, ...data[prop]], [])
  
    const userShifts = data.user_shifts.reduce((arr, { id }) => [...arr, id], [])
    const schedule = Array.from({ length: 14 }, (val, i) => userShifts.includes(++i))
  
    setUserData(userData)
    setPendingUserData(userData)
    setUserCampaigns(userCampaigns)
    setUserSkills(data.user_skills)
    setSchedule(schedule)
  }

  const getSkills = async () => {
    const { data } = await getAllSkills()
    const skills = data.map(skill => ({ value: skill.id, label: skill.name }))
    setSkills(skills)
  }
  
  // componentDidMount
  useEffect( () => {
    getProfile()
    getSkills()
  }, [])
  
  const toggleEditMode = () => {
    setEditMode(!editMode)
    setPendingUserData(userData)
  }

  // eslint-disable-next-line no-unused-vars
  const handleEditProfile = (event) => {
    setPendingUserData({ ...pendingUserData, [event.target.name]: event.target.value })
  }
  
  // eslint-disable-next-line no-unused-vars
  const saveProfile = async () => {
    try {
      await updateProfile(userID(), pendingUserData)
      
      setUserData(pendingUserData)
      toggleEditMode()
      
      setNotification({ message: 'your profile has been updated' })
      
    } catch (err) {
      setNotification({ message: err.response.data })
    }
  }
  
  // can we quickly go over how this destructure should look?
  // const { schedule: prev } = schedule?
  const editSchedule = slot => {
    const { schedule: prev } = this.state
    const schedule = update(prev, slot, !prev[slot])
    setSchedule(schedule)
  }
  
  const editSkills = skills => {
    const user_skills = 
    skills?.map(skill => ({ id: skill.value, name: skill.label })) || []
    
    setUserSkills(user_skills)
  }
  
  // eslint-disable-next-line no-unused-vars
  const saveSettings = async () => {
    // const { user_skills, schedule } = this.state
    // const { currentUser, setNotification } = this.props.app
    // const { setNotification } = app
  
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

  const changeSection = section => {
    if (section.value === 'logout') logout()
    else setSection(section)
  }
  
  const menu = {
    options: [
      'profile', 'campaigns', 'settings', 'logout'
    ].map(str => ({ label: str, value: str })),
    value: section,
    onChange: changeSection
  }
  
  // TODO move this to helper library
  const showWidget = () => {
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

  if (!userData) return null

  return (
    <Show
      title={`${userData.first_name} ${userData.last_name}`}
      menu={menu}
      banner={require('../../images/default_banner_profile.jpg')}
      image={require('../../images/default_profile.png')}
      imageLabel="change profile image"
      onImageClick={showWidget}
    >
      {{

        profile:
          <UserDetails
            editInfo={toggleEditMode}
            userData={userData}
            userSkills={user_skills}
            skills={skills}
            schedule={schedule}
            editSkills={editSkills}
            editSchedule={editSchedule}
          />,

        campaigns:
          <>
            <NewCampaign onClick={() => history.push('/campaigns/new')}>New Campaign</NewCampaign>

            {userCampaigns.map((campaign, i) => (
              <CampaignCard key={i} campaign={campaign} onClick={history.push} />))}
          </>,

        settings:
          <>
          </>
      }[section]}
    </Show>
  )
}

export default withTheme(withRouter(Profile))

// class Profile extends React.Component {
  
// state = {
//   // userData: null,
//   pendingUserData: null,
//   userCampaigns: [],
//   skills: null,

//   user_skills: [],
//   schedule: [],
//   editMode: false,
//   section: { label: 'profile', value: 'profile' },
// }

// componentDidMount = () => {
//   this.getProfile()
//   this.getSkills()
// }
    
//   render() {
//     // const { history } = this.props
//     // const { userData, userCampaigns, skills, section, schedule, user_skills, editMode } = this.state



//     return (
//     )
//   }
// }
