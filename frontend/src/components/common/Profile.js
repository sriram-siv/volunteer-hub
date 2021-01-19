/* eslint-disable camelcase */
import React from 'react'
import { withRouter } from 'react-router-dom'
import styled, { withTheme } from 'styled-components'
import Select from 'react-select'

import BannerImage from '../elements/BannerImage'
// import Button from '../elements/Button'
// import InputText from '../elements/InputText'
import { getSingleProfile, updateProfile, getAllSkills, updateProfileShifts, updateProfileSkills } from '../../lib/api'
import Schedule from '../elements/Schedule'

// import icons from '../../lib/icons'


const Wrapper = styled.div`
  position: relative;
  height: calc(100vh - 3rem);
  overflow-y: scroll;
  background-color: ${props => props.theme.background};
  padding-bottom: 30px;
`

const Logout = styled.button`
  position: fixed;
  top: calc(3rem + 10px);
  right: 15px;
  border: none;
  background-color: transparent;
`

const Panel = styled.div`
  position: relative;
  top: calc(250px - 3rem);
  left: 10px;
  width: calc(100vw - 23px);
  height: calc(100vh - 3rem - 20px);
  background-color: #eeed;
  /* background: linear-gradient(0deg, #fffa, #fffc); */
  border-radius: 3px;
  margin-bottom: 10px;
  backdrop-filter: blur(4px);
`

const Title = styled.h2`
  font-size: 1.1rem;
  background-color: ${props => props.theme.primary};
  color: #333;
  padding: 12px 20px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  height: 3rem;
`

const SelectWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 10rem;
`

const ProfilePic = styled.img`
  /* position: relative; */
  position: fixed;
  top: calc(3rem + 10px);
  left: 10px;
  /* background-image: ${props => props.image} */
  /* background-size: contain; */
  background-color: palevioletred;
  width: calc(230px - 3rem);
  height: calc(230px - 3rem);
  border-radius: 4px;
  opacity: 0.5;
`

class Profile extends React.Component {
  
  state = {
    userData: null,
    pendingUserData: null,
    userCampaigns: [],
    skills: null,
    formData: {
      user_skills: null,
      schedule: Array.from({ length: 14 }).fill(false)
    },
    editMode: false,
    newPic: null,
    section: { label: 'profile', value: 'profile' }
  }

  componentDidMount = async () => {
    this.getProfile()
    this.getSkills()
  }
  
  getProfile = async () => {
    const userID = localStorage.getItem('user_id')
    const response = await getSingleProfile(userID)
    
    const { username, first_name, last_name, email, phone, profile_image, user_skills } = response.data
    const userData = { username, first_name, last_name, email, phone, profile_image }

    const { owned_campaigns: owned, coord_campaigns: coord, conf_campaigns: volunteer } = response.data
    const userCampaigns = [...owned, ...coord, ...volunteer]

    console.log(response.data)
    
    const schedule = [...this.state.formData.schedule]
    response.data.user_shifts.forEach(shift => schedule[shift.id - 1] = true)
    const formData = { user_skills, schedule }
    
    this.setState({ userData, pendingUserData: userData, userCampaigns, formData }) 
  }

  showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      { 
        cloudName: 'dmhj1vjdf',
        uploadPreset: 'jisx4gi0',
        showUploadMoreButton: false
      },
      (error, result) => {
        if (!error && result && result.event === 'success') { 
          const pendingUserData = { ...this.state.pendingUserData, profile_image: result.info.url }
          this.setState({ pendingUserData })
        }
      })
    widget.open()
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

  saveEdits = async () => {
    try {
      const userID = localStorage.getItem('user_id')
      await updateProfile(userID, this.state.pendingUserData)
      this.setState({ userData: this.state.pendingUserData })
      this.handleEditMode()
      this.props.app.showNotification('your profile has been updated')
    } catch (err) {
      console.log(err.response.data)
    }
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
    const formData = { ...this.state.formData, user_skills }
    this.setState({ formData })
  }

  saveShiftsSkills = async () => {
    const { formData: { user_skills, schedule } } = this.state

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
    this.setState({ section })
  }

  render() {
    const { app, history } = this.props
    const { userData, pendingUserData, userCampaigns, skills, editMode, formData, section } = this.state
    const { schedule } = this.state.formData

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

    const menu = [
      { label: 'profile', value: 'profile' },
      { label: 'settings', value: 'settings' },
      { label: 'campaigns', value: 'campaigns' }
    ]


    if (!userData) return null

    // Shape data into react-select options object
    const userSkills = formData.user_skills.map(skill => ({ value: skill.id, label: skill.name }))


    return (
      <Wrapper>
        <div style={{ position: 'fixed', top: '3rem', width: 'calc(100% - 3px)', pointerEvents: 'none' }} >
          <BannerImage src={require('../../images/yellow-triangles-background.jpg')} />
        </div>
        <ProfilePic image={userData.profile_image} />
        <Logout onClick={this.logout}>Logout</Logout>

        <Panel>
          <Title>{`${userData.first_name} ${userData.last_name}`}</Title>
          <SelectWrapper>
            <Select styles={selectStyles} options={menu} value={section} onChange={this.changeSection} isSearchable={false} />
          </SelectWrapper>
          <div style={{ padding: '20px' }}>
            {section.value === 'profile' && <>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit porro, voluptas voluptatum voluptatibus sint assumenda commodi corrupti laudantium nobis nihil, architecto nisi, esse repellendus facere. Odit, provident aliquam amet ut incidunt nam quo voluptatem tempore eos odio nihil et tenetur commodi quidem a dignissimos illo dolor fuga modi magni? Quaerat?
            </>}
            {section.value === 'settings' && <>
              <p>Availability</p>
              <Schedule schedule={schedule} />
              <p>Skills</p>
              <Select />
            </>}
            {section.value === 'campaigns' && <>
              <div style={{ }}>
                {userCampaigns.map((campaign, i) =>
                  <button key={i} style={{ display: 'block', marginBottom: '5px' }} onClick={() => history.push(`/campaigns/${campaign.id}`)}>{campaign.name}</button>)}
              </div>
              <button onClick={() => history.push('/campaigns/new')}>new campaign</button>
            </>}
          </div>
        </Panel>
           
      </Wrapper>
    )
  }
}

export default withTheme(withRouter(Profile))