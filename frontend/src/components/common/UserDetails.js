import React from 'react'
import Select from 'react-select'
import styled, { ThemeContext } from 'styled-components'

import Schedule from '../elements/Schedule'

import styles from '../../lib/styles'
import icons from '../../lib/icons'

const EditProfile = styled.button`
  position: absolute;
  top: calc(3rem + 20px);
  right: 10px;
  width: 3rem;
  border: none;
  background-color: transparent;
`

const Wrapper = styled.div`


  p {
    padding-left: 5px;
  }
`

const UserDetails = ({ editInfo, userData, userSkills, skills, schedule, editSkills, editSchedule }) => {

  const theme = React.useContext(ThemeContext)

  const [editMode, setEditMode] = React.useState(false)
  
  userSkills = userSkills.map(skill => ({ value: skill.id, label: skill.name }))

  const userBio = userData.bio || 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet provident qui necessitatibus fugiat beatae, sequi, alias fugit suscipit rerum facere eaque reprehenderit nostrum officia tenetur debitis natus tempore animi esse?'

  return <Wrapper>
    <EditProfile onClick={editInfo}>{icons.edit()}</EditProfile>
    <p>About</p>
    <p>{userBio}</p>
    <p>Contact Info</p>
    <p>{userData.email}</p>
    <p>{userData.phone}</p>
    <p>Skills</p>
    <Select styles={styles.select(theme)} options={skills} value={userSkills} onChange={editSkills} isMulti />
    <br/>
    <p>Availability</p>
    <Schedule schedule={schedule} handleClick={editSchedule} />
  </Wrapper>
}

export default UserDetails