import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { confirmVolunteer, removeVolunteer, createRoom } from '../../lib/api'

import Button from '../elements/Button'
import MultiListVolunteer from '../elements/MultiListVolunteers'
import FilterVolunteers from '../elements/FilterVolunteers'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  height: 600px;

  > * {
    position: relative;
    height: 100%;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
`

class AdminPanel extends React.Component {

  state = {
    campaignID: null,
    volunteers: null,
    filteredVolunteers: null,
    pendingVolunteers: null,
    skills: [],
    schedule: Array.from({ length: 14 }).fill(false),
    strictSkills: true,
    strictSchedule: true,
    selectedVolunteers: [],
    groupName: ''
  }

  componentDidMount = () => {
    this.getCampaignData() 
  }

  componentDidUpdate = () => {
    if (this.state.campaignID !== this.props.campaignData.id) this.getCampaignData()
  }

  getCampaignData = () => {
    const { id, owner, coordinators, conf_volunteers: volunteers, pend_volunteers: pendingVolunteers } = this.props.campaignData
    this.setState({
      campaignID: id,
      volunteers: [owner, ...coordinators, ...volunteers],
      filteredVolunteers: [owner, ...coordinators, ...volunteers],
      pendingVolunteers
    })   
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
    const { volunteers, schedule, skills, strictSchedule, strictSkills } = this.state

    const isAvailableAll = user => (
      schedule.every((slot, i) => !slot || user.user_shifts.some(shift => shift.id - 1 === i))
    )
    const isAvailableAny = user => {
      if (schedule.every(slot => !slot)) return true
      return user.user_shifts.some(shift => schedule[shift.id - 1])
    }
    const hasSkillsAll = user => {
      if (!skills || !skills.length) return true
      return skills.every(skill => user.user_skills.some(userSkill => userSkill.id === skill.value))
    }
    const hasSkillsAny = user => {
      if (!skills || !skills.length) return true
      return user.user_skills.some(userSkill => skills.some(skill => skill.value === userSkill.id))
    }

    const filteredVolunteers = volunteers
      .filter(volunteer => strictSchedule ? isAvailableAll(volunteer) : isAvailableAny(volunteer))
      .filter(volunteer => strictSkills ? hasSkillsAll(volunteer) : hasSkillsAny(volunteer))
    
    this.setState({ filteredVolunteers })
  }

  selectStrict = (event) => {
    this.setState({ [event.target.id]: event.target.checked }, this.filterVolunteers)
  }

  editGroupName = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  selectVolunteer = id => {
    let selectedVolunteers = [...this.state.selectedVolunteers]
    if (selectedVolunteers.includes(id)) selectedVolunteers = selectedVolunteers.filter(vol => vol !== id)
    else selectedVolunteers.push(id)
    this.setState({ selectedVolunteers })
  }

  createNewGroup = async () => {
    const { groupName, selectedVolunteers, campaignID } = this.state
    if (!groupName || selectedVolunteers.length === 0) return
    const userID = Number(localStorage.getItem('user_id'))
    if (!selectedVolunteers.includes(userID)) selectedVolunteers.unshift(userID)
    const formData = {
      name: groupName,
      members: selectedVolunteers,
      campaign: campaignID
    }
    
    const response = await createRoom(formData)
    if (response.status === 201) {
      this.props.history.push(`/chat/${response.data.id}`)
    }
  }

  confirmVolunteer = async volunteerID => {
    try {
      await confirmVolunteer(this.state.campaignID, volunteerID)
      const confirmedVolunteer = this.state.pendingVolunteers.find(volunteer => volunteer.id === volunteerID)
      const volunteers = [...this.state.volunteers, confirmedVolunteer]
      const pendingVolunteers = this.state.pendingVolunteers.filter(volunteer => volunteer !== confirmedVolunteer)
      this.setState({ volunteers, pendingVolunteers }, this.filterVolunteers)
    } catch (err) {
      console.log(err)
    }
  }

  denyVolunteer = async volunteerID => {
    try {
      await removeVolunteer(this.state.campaignID, volunteerID)
      const pendingVolunteers = this.state.pendingVolunteers.filter(volunteer => volunteer.id !== volunteerID)
      this.setState({ pendingVolunteers })
    } catch (err) {
      console.log(err)
    }
  }

  volunteerActions = {
    selectVolunteer: this.selectVolunteer,
    confirmVolunteer: this.confirmVolunteer,
    denyVolunteer: this.denyVolunteer
  }

  render() {
    const {
      filteredVolunteers,
      pendingVolunteers,
      skills,
      schedule,
      strictSkills,
      strictSchedule,
      groupName
    } = this.state

    const volunteerLists = [
      { label: 'pending', users: pendingVolunteers },
      { label: 'volunteers', users: filteredVolunteers }
    ]

    return (
      <Wrapper>
        <div style={{ width: '360px' }}>
          <MultiListVolunteer lists={volunteerLists} actions={this.volunteerActions} />
        </div>
        <div style={{ width: 'calc(100% - 420px)' }}>
          <FilterVolunteers
            skills={skills}
            schedule={schedule}
            selectSkills={this.selectSkills}
            selectSchedule={this.selectSchedule}
            strictSkills={strictSkills}
            strictSchedule={strictSchedule}
            selectStrict={this.selectStrict}
            groupName={groupName}
            editGroupName={this.editGroupName}
          />
          <ButtonGroup>
            <Button width="calc(50% - 5px)" label="select all" />
            <div style={{ width: '5px' }} />
            <Button width="calc(50% - 5px)" primary label="create group" onClick={this.createNewGroup} />
          </ButtonGroup>
        </div>
      </Wrapper>
    )
  }
}

export default withRouter(AdminPanel)