/* eslint-disable camelcase */
import React from 'react'
import { withRouter } from 'react-router-dom'
import styled, { withTheme } from 'styled-components'
import Select from 'react-select'

import { getSingleProfile, updateProfile, getAllSkills, updateProfileShifts, updateProfileSkills } from '../../lib/api'

import Show from '../common/Show'
import CampaignCard from '../elements/CampaignCard'
import Schedule from '../elements/Schedule'

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
    ].reduce((obj, prop) => ({ ...obj, [prop]: data[prop] }))

    const userCampaigns = [
      'owned_campaigns', 'coord_campaigns', 'conf_campaigns'
    ].reduce((arr, prop) => [ ...arr, ...data[prop] ], [])

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
    const { currentUser, showNotification } = this.props.app
    try {

      await updateProfile(currentUser(), this.state.pendingUserData)

      this.setState(
        { userData: this.state.pendingUserData },
        this.toggleEditMode
      )

      showNotification('your profile has been updated')
    } catch (err) {
      showNotification(err.response.data)
    }
  }

  editSchedule = slot => {
    const schedule = [...this.state.schedule]
    schedule[slot] = !schedule[slot]
    this.setState({ schedule })
  }

  editSkills = skills => {
    const user_skills = 
      skills?.map(skill => ({ id: skill.value, name: skill.label })) || []
    
    this.setState({ user_skills })
  }

  saveSettings = async () => {
    const { user_skills, schedule } = this.state

    try {
      const userID = localStorage.getItem('user_id')
      const skillIds = user_skills.map(skill => skill.id)

      await updateProfileShifts(userID, { schedule })
      await updateProfileSkills(userID, { 'user_skills': skillIds })

      this.props.app.showNotification('your preferences have been updated')
    } catch (err) {
      console.log(err)
    }
  }

  logout = () => {
    this.props.app.logout()
    this.props.history.push('/campaigns')
  }

  changeSection = section => {
    if (section.value === 'logout') this.logout()
    else this.setState({ section })
  }

  render() {
    const { history } = this.props
    const { userData, pendingUserData, userCampaigns, skills, editMode, section, schedule, user_skills } = this.state

    const selectStyles = {
      control: styles => ({
        ...styles,
        backgroundColor: this.props.theme.background,
        borderRadius: '2px',
        borderColor: this.props.theme.shadow,
        height: 'calc(2rem)'
      }),
      singleValue: styles => ({
        ...styles,
        color: this.props.theme.text,
        fontWeight: this.props.theme.fontWeight,
        letterSpacing: this.props.theme.letterSpacing,
        left: '50%',
        transform: 'translate(calc(-50% + 1rem), -50%)'
      }),
      menu: styles => ({
        ...styles,
        backgroundColor: this.props.theme.background,
        color: this.props.theme.text,
        borderRadius: '2px',
        textAlign: 'center'
      }),
      indicatorSeparator: () => ({ width: 0 })
    }

    const menu = {
      options: [
        { label: 'profile', value: 'profile' },
        { label: 'campaigns', value: 'campaigns' },
        { label: 'settings', value: 'settings' },
        { label: 'logout', value: 'logout' }
      ],
      value: section,
      onChange: this.changeSection
    }

    if (!userData) return null

    // Shape data into react-select options object
    const userSkills = user_skills.map(skill => ({ value: skill.id, label: skill.name }))


    return (
      <Show
        title={`${userData.first_name} ${userData.last_name}`}
        menu={menu}
        banner={require('../../images/default_banner_profile.jpg')}
        image={require('../../images/default_profile.png')}
        onImageClick={this.showWidget}
      >

        {section.value === 'profile' && <>
          <p>&nbsp;About</p>
          <p style={{ paddingLeft: '5px' }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, cumque repellat dolorum modi, obcaecati corrupti laboriosam sint quidem rerum autem non nesciunt nihil consequatur nostrum! Doloribus voluptas recusandae nam aliquid!</p>
          <p>&nbsp;Contact Info</p>
          <p>&nbsp;{userData.email}</p>
          <p>&nbsp;{userData.phone}</p>
          <p>&nbsp;Skills</p>
          <Select styles={selectStyles} options={skills} value={userSkills} onChange={this.editSkills} isMulti />
          <br/>
          <p>&nbsp;Availability</p>
          <Schedule schedule={schedule} handleClick={this.editSchedule} />
        </>}

        {section.value === 'campaigns' && <>
          <NewCampaign onClick={() => history.push('/campaigns/new')}>New Campaign</NewCampaign>
          <div style={{}}>
            {userCampaigns.map((campaign, i) => (
              <CampaignCard key={i} campaign={campaign} onClick={history.push} />))}
          </div>
        </>}

        {section.value === 'settings' && <>
      
        </>}

      </Show>
    )
  }
}

export default withTheme(withRouter(Profile))