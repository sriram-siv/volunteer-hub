/* eslint-disable camelcase */
import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { createRoom, updateVolunteers } from '../../lib/api'

import FilterControls from '../elements/FilterControls'
import List from '../elements/List'
import UserCard from '../elements/UserCard'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - 6rem - 65px);

  > * {
    position: relative;
    height: 100%;
    width: calc(50% - 5px);
  }
`

class VolunteersPanel extends React.Component {

  state = {
    filteredUsers: [],
    memberList: [],
    listDisplay: 'members',
    skills: {
      values: [],
      strict: true
    },
    schedule: {
      values: Array.from({ length: 14 }),
      strict: true
    },
    selectedVolunteers: [],
    groupName: ''
  }

  componentDidMount = () => {
    this.toggleUserList('members')
  }

  toggleUserList = list => {

    const { campaignData } = this.props

    const memberList = list === 'members'
      ? ['owner', 'coordinators', 'conf_volunteers']
        .reduce((arr, prop) => arr.concat(campaignData[prop]), [])
      : campaignData.pend_volunteers

    this.setState({ listDisplay: list, memberList, selectedVolunteers: [] }, this.filterUsers)
  }

  selectSchedule = slot => {
    const values = [...this.state.schedule.values]
    values[slot] = !values[slot]
    this.setState({ schedule: { ...this.state.schedule, values } }, this.filterUsers)
  }

  selectSkills = values => {
    this.setState({ skills: { ...this.state.skills, values } }, this.filterUsers)
  }

  filterUsers = () => {
    const { memberList, schedule, skills, selectedVolunteers } = this.state

    const isAvailable = userShifts => (
      schedule.strict
        ? schedule.values.every((slot, i) => !slot || userShifts.some(({ id }) => id - 1 === i))
        : schedule.values.some((slot, i) => slot && userShifts.some(({ id }) => id - 1 === i))
    )

    const hasSkills = userSkills => (
      skills.strict
        ? skills.values.every(({ value }) => userSkills.some(({ id }) => value === id))
        : skills.values.some(({ value }) => userSkills.some(({ id }) => value === id))
    )

    const filteredUsers = memberList
      .filter(({ user_skills }) => !skills.values?.length || hasSkills(user_skills))
      .filter(({ user_shifts }) => schedule.values.every(slot => !slot) || isAvailable(user_shifts))
    
    const newSelected = selectedVolunteers.filter(id => filteredUsers.map(({ id }) => id).includes(id))
    
    this.setState({ filteredUsers, selectedVolunteers: newSelected })
  }

  toggleStrict = (event) => {
    this.setState(
      { [event.target.id]: { ...this.state[event.target.id], strict: event.target.checked } },
      this.filterUsers
    )
  }

  editGroupName = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  confirmVolunteer = async volunteerID => {
    const { campaignData, updateData } = this.props
    try {
      await updateVolunteers(campaignData.id, { volunteer_id: volunteerID, action: 'confirm' })
      updateData()
      // const confirmedVolunteer = this.state.pendingVolunteers.find(volunteer => volunteer.id === volunteerID)
      // const volunteers = [...this.state.volunteers, confirmedVolunteer]
      // const pendingVolunteers = this.state.pendingVolunteers.filter(volunteer => volunteer !== confirmedVolunteer)
      // this.setState({ volunteers, pendingVolunteers }, this.filterVolunteers)
    } catch (err) {
      console.error(err)
    }
  }

  denyVolunteer = async volunteerID => {
    const { campaignData, updateData } = this.props
    try {
      await updateVolunteers(campaignData.id, { volunteer_id: volunteerID, action: 'delete' })
      updateData()
      // const pendingVolunteers = this.state.pendingVolunteers.filter(volunteer => volunteer.id !== volunteerID)
      // this.setState({ pendingVolunteers })
    } catch (err) {
      console.error(err)
    }
  }

  selectVolunteer = event => {
    const { selectedVolunteers } = this.state
    const id = +event.target.name

    if (selectedVolunteers.includes(id)) {
      this.setState({ selectedVolunteers: [...selectedVolunteers].filter(vol => vol !== id) })
    } else {
      this.setState({ selectedVolunteers: selectedVolunteers.concat(id) })
    }
  }

  selectAll = () => {

    const { selectedVolunteers, memberList, filteredUsers } = this.state
    const allSelected = selectedVolunteers.length === memberList.length

    const newSelection = allSelected ? [] : filteredUsers.map(({ id }) => id)

    this.setState({ selectedVolunteers: newSelection })
  }

  createNewGroup = async () => {
    const { groupName, selectedVolunteers } = this.state
    const { campaignData } = this.props
    if (!groupName || !selectedVolunteers.length) return
    const userID = Number(localStorage.getItem('id'))
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
    const {
      filteredUsers,
      listDisplay,
      selectedVolunteers,
      skills,
      schedule,
      groupName
    } = this.state

    const { isAdmin } = this.props

    const itemElement = (user, i, itemExpanded, showDetail) => (
      <UserCard
        key={i}
        user={user}
        isSelected={selectedVolunteers.includes(user.id)}
        isExpanded={user.id === itemExpanded}
        showDetail={showDetail}
        select={listDisplay === 'members' && this.selectVolunteer}
        confirm={listDisplay === 'pending' && this.confirmVolunteer}
        deny={listDisplay === 'pending' && this.denyVolunteer}
      />
    )

    return (
      <Wrapper>

        <List
          items={filteredUsers}
          itemElement={itemElement}
        />

        {isAdmin &&
          <FilterControls
            skills={skills}
            schedule={schedule}
            selectSkills={this.selectSkills}
            selectSchedule={this.selectSchedule}
            toggleStrict={this.toggleStrict}
            toggleList={this.toggleUserList}
            groupName={groupName}
            editGroupName={this.editGroupName}
            selectAll={this.selectAll}
            createNewGroup={this.createNewGroup}
            showChatCreate={listDisplay === 'members'}
          />}

      </Wrapper>
    )
  }
}

export default withRouter(VolunteersPanel)