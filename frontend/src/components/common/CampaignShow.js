import React from 'react'
import styled from 'styled-components'

import BannerImage from '../elements/BannerImage'
import MultiList from '../elements/MultiList'
import NoticeBox from '../common/NoticeBox'
import MultiListVolunteer from '../elements/MultiListVolunteers'
import CampaignInfo from '../elements/CampaignInfo'
import FilterVolunteers from '../elements/FilterVolunteers'
import InputText from '../elements/InputText'

import { getSingleCampaign, createRoom } from '../../lib/api'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  /* min-height: calc(100vh - 3rem); */
  position: relative;
  height: calc(100vh - 3rem);
  overflow-y: scroll;
`

const MainContent = styled.div`
  display: flex;
`

const AdminPanel = styled.div`
  display: ${props => props.show ? 'flex' : 'none'};
`

const Button = styled.button`
  position: absolute;
  bottom: 20px;
  right: ${props => `${props.position * 210 + 30}px`};
  width: 200px;
  padding: 10px;
  border-radius: 2px;
  border: 2px solid ${props => props.theme.primary};
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  &:hover {
    background-color: ${props => props.theme.primary};
  }
`

class CampaignShow extends React.Component {

  state = {
    campaignData: null,
    filteredVolunteers: null,
    members: null,
    rooms: null,
    admin: false,
    schedule: Array.from({ length: 14 }).fill(false),
    skills: null,
    strictSkills: true,
    strictSchedule: true,
    selectedVolunteers: [],
    newGroupName: ''
  }
  
  componentDidMount = () => {
    this.getCampaign()
  }

  componentDidUpdate = prevProps => {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getCampaign()
    }
  }

  getCampaign = async () => {
    try {
      // Get campaign data and set filtered volunteer list to be all members
      const response = await getSingleCampaign(this.props.match.params.id)
      const allMembers = [ response.data.owner, ...response.data.coordinators, ...response.data.conf_volunteers ]
      this.setState({ campaignData: response.data, filteredVolunteers: allMembers })
      // Format rooms to be usuable by list component
      const roomItems = response.data.message_rooms.filter(room => {
        const userID = Number(localStorage.getItem('user_id'))
        return room.members.includes(userID)
      }).map(room => ({ name: room.name, id: room.id, onClick: () => this.openChatRoom(room.id) }))
      const rooms = { title: 'groups', items: roomItems }
      // Format members for the same purpose
      const memberItems = allMembers.map(volunteer => ({ name: volunteer.username, id: volunteer.id, onClick: () => console.log('user ' + volunteer.username) }))
      const members = { title: 'members', items: memberItems }
      this.setState({ rooms, members })
    } catch (err) {
      // Go back a page if user is not authorized to view the page
      console.log(err.response)
      this.props.history.goBack()
    }
    this.setState({ admin: this.isAdmin() })
  }

  openChatRoom = roomID => {
    this.props.history.push(`/chat/${roomID}`)
  }

  isAdmin = () => {
    if (this.state.campaignData) {
      const userId = Number(localStorage.getItem('user_id'))
      const isOwner = this.state.campaignData.owner.id === userId
      const isCoord = this.state.campaignData.coordinators.includes(userId)
      return (isOwner || isCoord)
    }
  }

  selectSchedule = slot => {
    const schedule = [...this.state.schedule]
    schedule[slot] = !schedule[slot]
    this.setState({ schedule }, this.filterVolunteers)
  }

  selectSkills = selected => {
    this.setState({ skills: selected }, this.filterVolunteers)
  }

  filterVolunteers = () => {
    const { schedule, skills, strictSchedule, strictSkills } = this.state

    const isAvailableAll = user => (
      schedule.every((slot, i) => !slot || user.user_shifts.some(shift => shift.id - 1 === i))
    )
    const isAvailableAny = user => {
      if (schedule.every(slot => !slot)) return true
      return user.user_shifts.some(shift => schedule[shift.id - 1])
    }
    const hasSkillsAll = user => {
      console.log(skills)
      if (!skills || skills.length < 1) return true
      return skills.every(skill => user.user_skills.some(userSkill => userSkill.id === skill.value))
    }
    const hasSkillsAny = user => {
      if (!skills || skills.length < 1) return true
      return user.user_skills.some(userSkill => skills.some(skill => skill.value === userSkill.id))
    }


    let filteredVolunteers = [ this.state.campaignData.owner, ...this.state.campaignData.coordinators, ...this.state.campaignData.conf_volunteers ]
    // Filter for schedule
    filteredVolunteers = filteredVolunteers.filter(volunteer => {
      if (strictSchedule) return isAvailableAll(volunteer)
      return isAvailableAny(volunteer)
    }).filter(volunteer => {
      if (strictSkills) return hasSkillsAll(volunteer)
      return hasSkillsAny(volunteer)
    })
    
    this.setState({ filteredVolunteers })
  }

  selectStrict = (event) => {
    this.setState({ [event.target.id]: event.target.checked }, this.filterVolunteers)
  }

  editNewGroupName = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  selectVolunteer = id => {
    let selectedVolunteers = [...this.state.selectedVolunteers]
    if (selectedVolunteers.includes(id)) selectedVolunteers = selectedVolunteers.filter(vol => vol !== id)
    else selectedVolunteers.push(id)
    this.setState({ selectedVolunteers })
  }

  createNewGroup = async () => {
    const { newGroupName, selectedVolunteers, campaignData } = this.state
    if (!newGroupName || selectedVolunteers.length === 0) return
    const userID = Number(localStorage.getItem('user_id'))
    if (!selectedVolunteers.includes(userID)) selectedVolunteers.unshift(userID)
    const formData = {
      name: newGroupName,
      members: selectedVolunteers,
      campaign: campaignData.id
    }
    const response = await createRoom(formData)
    if (response.status === 201) this.openChatRoom(response.data.id)
  }


  render() {
    
    const multiListStyle = {
      position: 'absolute',
      top: '5px',
      right: '5px'
    }

    const { campaignData, members, rooms, admin, schedule, filteredVolunteers, skills, strictSkills, strictSchedule, newGroupName } = this.state
    if (!campaignData || !members || !rooms) return null

    return (
      <Wrapper>
        <div>
          <BannerImage />
        </div>
        <MultiList containerStyle={multiListStyle} lists={[members, rooms]}/>
        <MainContent>
          <div style={{ width: '400px', height: '100%', padding: '20px', fontSize: '0.85rem', textAlign: 'justify' }}>
            <CampaignInfo campaignData={campaignData}/>
          </div>
          <div style={{ width: 'calc(100% - 400px)', padding: '20px', paddingLeft: 0 }}>
            <NoticeBox campaignData={campaignData} admin={admin} />
          </div>
        </MainContent>
        <AdminPanel show={admin}>
          <div style={{ width: '400px', padding: '20px' }}>
            <MultiListVolunteer campaignData={campaignData} filteredVolunteers={filteredVolunteers}  selectVolunteer={this.selectVolunteer} containerStyle={{ height: '600px' }}/>
          </div>
          <div style={{ position: 'relative', width: 'calc(100% - 400px)', padding: '20px', paddingLeft: 0 }}>
            <FilterVolunteers
              skills={skills}
              schedule={schedule}
              selectSkills={this.selectSkills}
              selectSchedule={this.selectSchedule}
              strictSkills={strictSkills}
              strictSchedule={strictSchedule}
              selectStrict={this.selectStrict}
              newGroupName={newGroupName}
              editNewGroupName={this.editNewGroupName}
            />
            <Button position={1}>select all</Button>
            <Button position={0} onClick={this.createNewGroup}>create group</Button>
          </div>
        </AdminPanel>
      </Wrapper>
    )
  }
}

export default CampaignShow