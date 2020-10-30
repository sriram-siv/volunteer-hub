import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { createRoom } from '../../lib/api'

import Button from '../elements/Button'
import MultiListVolunteer from '../elements/MultiListVolunteers'
import FilterVolunteers from '../elements/FilterVolunteers'


const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  height: 600px;
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
    filteredVolunteers: null,
    skills: [],
    schedule: Array.from({ length: 14 }).fill(false),
    strictSkills: true,
    strictSchedule: true,
    selectedVolunteers: [],
    groupName: ''
  }

  componentDidMount = () => {
    const { owner, coordinators, conf_volunteers: volunteers } = this.props.campaignData
    this.setState({ campaignData: this.props.campaignData, filteredVolunteers: [owner, ...coordinators, ...volunteers] })    
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
    const { campaignData, schedule, skills, strictSchedule, strictSkills } = this.state

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

    const filteredVolunteers = [ campaignData.owner, ...campaignData.coordinators, ...campaignData.conf_volunteers ]
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
    const { groupName, selectedVolunteers, campaignData } = this.state
    console.log(campaignData)
    if (!groupName || selectedVolunteers.length === 0) return
    const userID = Number(localStorage.getItem('user_id'))
    if (!selectedVolunteers.includes(userID)) selectedVolunteers.unshift(userID)
    const formData = {
      name: groupName,
      members: selectedVolunteers,
      campaign: campaignData.id
    }
    
    const response = await createRoom(formData)
    if (response.status === 201) {
      this.props.history.push(`/chat/${response.data.id}`)
    }
  }


  render() {
    const { campaignData } = this.props
    const { filteredVolunteers, skills, schedule, strictSkills, strictSchedule, groupName } = this.state
    return (
      <Wrapper>
        <div style={{ width: '360px' }}>
          <MultiListVolunteer campaignData={campaignData} filteredVolunteers={filteredVolunteers}  selectVolunteer={this.selectVolunteer} containerStyle={{ height: '600px' }}/>
        </div>
        <div style={{ position: 'relative', width: 'calc(100% - 420px)' }}>
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
            <Button width="calc(50% - 10px)" label="select all" />
            <Button width="calc(50% - 10px)" primary label="create group" onClick={this.createNewGroup} />
          </ButtonGroup>
        </div>
      </Wrapper>
    )
  }
}

export default withRouter(AdminPanel)