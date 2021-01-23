/* eslint-disable camelcase */
import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { updateVolunteers, createRoom } from '../../lib/api'

import FilterVolunteers from '../elements/FilterVolunteers'
import List from '../elements/List'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;

  > * {
    position: relative;
    height: 100%;
    width: calc(50% - 5px);
  }
`

class AdminPanel extends React.Component {

  state = {
    campaignID: null,
    volunteers: null,
    filteredVolunteers: null,
    pendingVolunteers: null,
    skills: [],
    schedule: Array.from({ length: 14 }),
    strictSkills: true,
    strictSchedule: true,
    selectedVolunteers: [],
    groupName: ''
  }

  componentDidMount = () => {
    this.getCampaignData() 
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

    const isAvailable = userShifts => (
      strictSchedule
        ? schedule.every((slot, i) => !slot || userShifts.some(({ id }) => id - 1 === i))
        : schedule.some((slot, i) => slot && userShifts.some(({ id }) => id - 1 === i))
    )

    const hasSkills = userSkills => (
      strictSkills
        ? skills.every(({ value }) => userSkills.some(({ id }) => value === id))
        : skills.some(({ value }) => userSkills.some(({ id }) => value === id))
    )

    const filteredVolunteers = volunteers
      .filter(({ user_skills }) => !skills?.length || hasSkills(user_skills))
      .filter(({ user_shifts }) => schedule.every(slot => !slot) || isAvailable(user_shifts))
    
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
      await updateVolunteers(this.state.campaignID, { volunteer_id: volunteerID, action: 'confirm' })
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
      await updateVolunteers(this.state.campaignID, { volunteer_id: volunteerID, action: 'delete' })
      const pendingVolunteers = this.state.pendingVolunteers.filter(volunteer => volunteer.id !== volunteerID)
      this.setState({ pendingVolunteers })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const {
      pendingVolunteers,
      skills,
      schedule,
      strictSkills,
      strictSchedule
    } = this.state

    return (
      <Wrapper>

        <List
          title="pending requests"
          items={pendingVolunteers}
        />

        <FilterVolunteers
          skills={skills}
          schedule={schedule}
          selectSkills={this.selectSkills}
          selectSchedule={this.selectSchedule}
          strictSkills={strictSkills}
          strictSchedule={strictSchedule}
          selectStrict={this.selectStrict}
        />

      </Wrapper>
    )
  }
}

export default withRouter(AdminPanel)