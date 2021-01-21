/* eslint-disable camelcase */
import React from 'react'
import { withRouter } from 'react-router-dom'
import styled, { withTheme } from 'styled-components'
import Select from 'react-select'

import BannerImage from '../elements/BannerImage'
// import Button from '../elements/Button'
import InputText from '../elements/InputText'
import { SplitContain, SplitRow } from '../elements/Split'
import { getSingleProfile, updateProfile, getAllSkills, updateProfileShifts, updateProfileSkills } from '../../lib/api'
import Schedule from '../elements/Schedule'

import icons from '../../lib/icons'


const Wrapper = styled.div`
  position: relative;
  height: calc(100vh - 3rem);
  overflow-y: scroll;
  background-color: ${props => props.theme.background};
  padding-bottom: 30px;
`

const ProfilePic = styled.img`
  position: absolute;
  top: 50px;
  left: 100px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.panels};
`

const EditPic = styled.img`
  position: absolute;
  bottom: -130px;
  left: 30px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.shadow};
`

const EditPicButton = styled.button`
  padding: 0;
  padding-bottom: 2px;
  position: absolute;
  bottom: -70px;
  left: 25px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.shadow};
`

const Section = styled.div`
  position: relative;
  height: 450px;
  padding: 20px;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.panels};
`

const PageTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 30px 0;
  text-align: center;
  color: ${props => props.theme.text};
`

const SectionTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 30px;
`

const Button = styled.button`
  position: absolute;
  bottom: 10px;
  right: ${props => `${props.position * 120 + 20}px`};
  width: 100px;
  padding: 10px;
  border-radius: 2px;
  border: 2px solid ${props => props.theme.primary};
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`

const EditForm = styled.div`
  position: relative;
  > * {
    margin: 5px 0;
  }
`

class Profile extends React.Component {
  
  state = {
    userData: null,
    pendingUserData: null,
    skills: null,
    formData: {
      user_skills: null,
      schedule: Array.from({ length: 14 }).fill(false)
    },
    editMode: false,
    newPic: null
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
    
    const schedule = [...this.state.formData.schedule]
    response.data.user_shifts.forEach(shift => schedule[shift.id - 1] = true)
    const formData = { user_skills, schedule }
    
    this.setState({ userData, pendingUserData: userData, formData }) 
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

  render() {
    // const { app } = this.props
    const { userData, pendingUserData, skills, editMode, formData } = this.state
    const { schedule } = this.state.formData

    const selectStyles = {
      control: styles => ({
        ...styles,
        backgroundColor: this.props.theme.background,
        borderRadius: '2px',
        borderColor: this.props.theme.shadow,
        height: '5rem'
      }),
      singleValue: (styles) => ({
        ...styles,
        color: this.props.theme.text,
        fontWeight: this.props.theme.fontWeight,
        letterSpacing: this.props.theme.letterSpacing,
        fontSize: '0.85rem'
      })
    }

    if (!userData) return null

    // Shape data into react-select options object
    const userSkills = formData.user_skills.map(skill => ({ value: skill.id, label: skill.name }))

    return (
      <Wrapper>
        <BannerImage src={'http://backgroundlabs.com/wp-content/uploads/2014/10/yellow-triangles-background.jpg'}>
          <ProfilePic src={userData.profile_image} />
          <div style={{ position: 'absolute', top: '40px', right: '120px', height: '2rem' }}>
            <Button onClick={this.logout}>Logout</Button>
          </div>
        </BannerImage>
        <PageTitle>{userData.username}</PageTitle>


        <SplitContain>
          <SplitRow>
            <Section>
              {!editMode
                ?
                <>
                  <SectionTitle > My Profile</SectionTitle>
                  <p>{userData.first_name} {userData.last_name}</p>
                  <p>email: {userData.email}</p>
                  <p style={{ marginTop: '-15px' }}>phone: {userData.phone}</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil molestias sed adipisci nulla! Neque hic omnis nam harum! Eligendi quasi fugiat enim odit commodi nam optio nesciunt laboriosam cum eius quam aspernatur minus fuga quia tempora animi inventore numquam quas ducimus unde, temporibus tenetur velit. Tenetur necessitatibus ducimus nam at.</p>
                  <Button position={0} onClick={this.handleEditMode}>Edit</Button>
                </>
                :
                <>
                  <SectionTitle>Edit Profile</SectionTitle>
                  <EditForm>
                    <InputText name='first_name' value={pendingUserData.first_name} label='First Name'  returnValue={this.handleEditChange}></InputText>
                    <InputText name='last_name' value={pendingUserData.last_name} label='Last Name' returnValue={this.handleEditChange}></InputText>
                    <InputText name='email' value={pendingUserData.email} label='Email' returnValue={this.handleEditChange}></InputText>
                    <InputText name='phone' value={pendingUserData.phone} label='Phone' returnValue={this.handleEditChange}></InputText>
                    <EditPic src={pendingUserData.profile_image} />
                    <EditPicButton onClick={this.showWidget}>
                      {icons.edit('#232323', 18)}
                    </EditPicButton>
                  </EditForm>
                  <Button position={1} onClick={this.saveEdits}>Save</Button>
                  <Button position={0} onClick={this.discardEdits}>Cancel</Button>
                </>
              }
            </Section>
            <Section>
              <SectionTitle>My Preferences</SectionTitle>
              <p>availability</p>
              <Schedule handleClick={this.editSchedule} schedule={schedule} />
              <p>skills</p>
              <Select styles={selectStyles} value={userSkills} options={skills} isMulti onChange={this.editSkills}/>
              <Button position={0} onClick={this.saveShiftsSkills}>Save</Button>
            </Section>
          </SplitRow>
        </SplitContain>
        
      </Wrapper>
    )
  }
}

export default withTheme(withRouter(Profile))