/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { createRoom, updateVolunteers } from '../../lib/api'

import { AppContext } from '../../App'

import FilterControls from '../elements/FilterControls'
import List from '../elements/List'
import UserCard from '../elements/UserCard'
import Button from '../elements/Button'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - 6rem - 40px);

  > * {
    position: relative;
    height: 100%;
    margin: auto 5px;
  }

  @media screen and (max-width: 650px) {

    flex-direction: column;

    > * { margin: auto; }

    >:nth-child(${props => props.panel + 1}) {
      display: none
    }
  }
`

const ControlToggle = styled.div`
  margin: -10px 0 10px;
  height: 3rem;

  @media screen and (min-width: 651px) {
    display: none;
  }
`

const VolunteersPanel = ({ campaignData, updateData, isAdmin }) => {

  const app = useContext(AppContext)
  const history = useHistory()

  const [filteredUsers, setFilteredUsers] = useState([])
  const [memberList, setMemberList] = useState([])
  const [listDisplay, setListDisplay] = useState('members')
  const [skills, setSkills] = useState({ values: [], strict: true })
  const [schedule, setSchedule] = useState({ values: Array.from({ length: 14 }), strict: true })
  const [selectedVolunteers, setSelectedVolunteers] = useState([])
  const [groupName, setGroupName] = useState('')

  const [panel, setPanel] = useState(1)

  const togglePanel = () => setPanel((panel % 2) + 1)

  // onMount
  useEffect(() => toggleUserList('members'), [])
  // update campaign data from request actions
  useEffect(() => toggleUserList(listDisplay), [campaignData])


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
        () => {
          // console.log(res)
          updateData()
        },
        () => {
          app.setNotification(
            { message: 'There was an error while attempting to update the list' }
          )
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

    const response = await createRoom({
      name: groupName,
      members: selectedVolunteers.concat(app.user),
      campaign: campaignData.id
    })
    if (response.status === 201) {
      history.push(`/chat/${response.data.id}`)
    }
  }

  useEffect(filterUsers, [memberList, skills, schedule])

  const itemElement = (user, i, itemExpanded, showDetail) => (
    <UserCard
      key={i}
      user={user}
      isSelected={selectedVolunteers.includes(user.id)}
      isExpanded={user.id === itemExpanded}
      showDetail={showDetail}
      select={listDisplay === 'members' && isAdmin && selectVolunteer}
      updateList={listDisplay === 'pending' && updateList}
    />
  )



  return (
    <Wrapper panel={panel}>

      <ControlToggle>
        <Button width="100%" onClick={togglePanel}>Filter List</Button>
      </ControlToggle>

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
          selectFunction={selectedVolunteers.length !== memberList.length}
        />}

    </Wrapper>
  )
}

export default VolunteersPanel