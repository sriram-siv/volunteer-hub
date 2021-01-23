/* eslint-disable camelcase */
import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { createRoom } from '../../lib/api'

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
    filteredUsers: null,
    listDisplay: 'volunteers',
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
    this.filterUsers()
  }

  toggleUserList = () => {
    const listDisplay = this.state.listDisplay === 'volunteers' ? 'pending' : 'volunteers'
    this.setState({ listDisplay }, this.filterUsers)
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
    const { listDisplay, schedule, skills } = this.state
    const { campaignData } = this.props

    const volunteers = listDisplay === 'volunteers'
      ? ['owner', 'coordinators', 'conf_volunteers']
        .reduce((arr, prop) => arr.concat(campaignData[prop]), [])
      : campaignData.pend_volunteers

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

    const filteredUsers = volunteers
      .filter(({ user_skills }) => !skills.values?.length || hasSkills(user_skills))
      .filter(({ user_shifts }) => schedule.values.every(slot => !slot) || isAvailable(user_shifts))
    
    this.setState({ filteredUsers })

    // TODO remove ids from selectedVols that arent in the filtered list
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

  selectVolunteer = id => {
    const { selectedVolunteers } = this.state

    if (selectedVolunteers.includes(id)) {
      this.setState({ selectedVolunteers: [...selectedVolunteers].filter(vol => vol !== id) })
    } else {
      this.setState({ selectedVolunteers: selectedVolunteers.concat(id) })
    }
  }

  selectAll = () => {
    const selectedVolunteers = this.state.filteredUsers
      .map(({ id }) => id)

    this.setState({ selectedVolunteers })
  }

  createNewGroup = async () => {
    const { groupName, selectedVolunteers } = this.state
    const { campaignData } = this.props
    if (!groupName || !selectedVolunteers.length) return
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
    const {
      filteredUsers,
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
        select={this.selectVolunteer}
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
          />}

      </Wrapper>
    )
  }
}

export default withRouter(VolunteersPanel)