/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

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

const VolunteersPanel = ({ campaignData, isAdmin }) => {

  const history = useHistory()

  const [filteredUsers, setFilteredUsers] = useState([])
  const [memberList, setMemberList] = useState([])
  const [listDisplay, setListDisplay] = useState('members')
  const [skills, setSkills] = useState({ values: [], strict: true })
  const [schedule, setSchedule] = useState({ values: [], strict: true })
  const [selectedVolunteers, setSelectedVolunteers] = useState([])
  const [groupName, setGroupName] = useState('')

  // onMount
  useEffect(() => toggleUserList('members'), [])

  useEffect(() => filterUsers, [memberList, skills, schedule])

  const toggleUserList = listName => {

    setListDisplay(listName)

    setMemberList(
      listName === 'members'
        ? ['owner', 'coordinators', 'conf_volunteers']
          .reduce((arr, prop) => arr.concat(campaignData[prop]), [])
        : campaignData.pend_volunteers
    )

    setSelectedVolunteers([])
  }

  const selectSchedule = slot => {
    setSchedule({
      ...schedule,
      values: schedule.values.map((val, i) => i === slot ? !val : val)
    })
  }

  const selectSkills = values => {
    setSkills({ ...skills, values })
  }

  const filterUsers = () => {

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

    setFilteredUsers(
      memberList
        .filter(({ user_skills }) => !skills.values?.length || hasSkills(user_skills))
        .filter(({ user_shifts }) => schedule.values.every(slot => !slot) || isAvailable(user_shifts))
    )

    setSelectedVolunteers(
      selectedVolunteers.filter(id => filteredUsers.map(({ id }) => id).includes(id))
    )
  }

  const toggleStrict = event => {
    if (event.target.id === 'skills') {
      setSkills({ ...skills, strict: event.target.checked })
    } else {
      setSchedule({ ...schedule, strict: event.target.checked })
    }
  }

  const editGroupName = event => setGroupName(event.target.value)

  // TODO BACKEND return campaignData 
  const updateList = (volunteer_id, action) => {
    updateVolunteers(campaignData.id, { volunteer_id, action })
      .then(
        res => console.log(res, 'TODO update parent with new data'),
        res => {
          console.log({ res })
          // app.setNotification({ message: 'There was an error while attempting to update the list' })
        }
      )
  }

  const selectVolunteer = event => {
    const id = +event.target.name
    setSelectedVolunteers(
      selectedVolunteers.includes(id)
        ? [...selectedVolunteers].filter(vol => vol !== id)
        : selectedVolunteers.concat(id)
    )
  }

  // TODO deselect not working on filtered lists
  const selectAll = () => {
    setSelectedVolunteers(
      selectedVolunteers.length !== memberList.length
        ? filteredUsers.map(({ id }) => id)
        : []
    )
  }

  const createNewGroup = async () => {
    if (!groupName || !selectedVolunteers.length) return
    const userID = Number(localStorage.getItem('user_id'))
    const members = selectedVolunteers
      .concat(selectedVolunteers.includes(userID) ? null : userID)
    // instead - does backend filter out doubles
    // const members = selectedVolunteers.concat(userID)
    const response = await createRoom({
      name: groupName,
      members,
      campaign: campaignData.id
    })
    if (response.status === 201) {
      history.push(`/chat/${response.data.id}`)
    }
  }

  const itemElement = (user, i, itemExpanded, showDetail) => (
    <UserCard
      key={i}
      user={user}
      isSelected={selectedVolunteers.includes(user.id)}
      isExpanded={user.id === itemExpanded}
      showDetail={showDetail}
      select={listDisplay === 'members' && selectVolunteer}
      // TODO update usercard component to reflect consolidated action for updating
      // () => updateList(vol_id, 'action')
      updateList={listDisplay === 'pending' && updateList}
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
          selectSkills={selectSkills}
          selectSchedule={selectSchedule}
          toggleStrict={toggleStrict}
          toggleList={toggleUserList}
          groupName={groupName}
          editGroupName={editGroupName}
          selectAll={selectAll}
          createNewGroup={createNewGroup}
          showChatCreate={listDisplay === 'members'}
        />}

    </Wrapper>
  )
}

export default VolunteersPanel