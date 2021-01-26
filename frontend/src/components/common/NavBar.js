import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'

import { AppContext } from '../../App'

import icons from '../../lib/icons'
import UserForms from '../elements/UserForms'

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  background-color: ${props => props.theme.primary};
  position: relative;
  z-index: 10;
`

const Title = styled.div`
    padding-left: 30px;
      font-family: 'Montserrat Alternates', sans-serif;
      font-size: 1.1.rem;
      pointer-events: none;
      &::selection {
        background-color: transparent;
      }
    `

// TODO make these buttons - for accessibility
const Items = styled.div`
  position: absolute;
  right: 25px;
  > * {
    margin-left: 10px;
    cursor: pointer;
  }
`

const NavBar = ({ changeTheme }) => {

  const app = useContext(AppContext)
  const theme = useContext(ThemeContext)
  const history = useHistory()

  const [showForm, setShowForm] = useState(false)

  const navUser = <>
    <span onClick={() => history.push('/profile')}>
      {icons.user()}
    </span>
    <span onClick={() => history.push('/campaigns')}>
      {icons.home()}
    </span>
    <span onClick={changeTheme}>
      {theme.name === 'light' ? icons.sun() : icons.moon()}
    </span>
  </>

  const navGuest = <>
    <span onClick={() => setShowForm(!showForm)}>
      login
    </span>
  </>

  return (
    <>
      <UserForms visible={showForm} onLogin={() => setShowForm(false)} />
      <NavBarContainer>
        <Title>VolunteerHub</Title>
        <Items>
          {app.currentUser() ? navUser : navGuest }
        </Items>
      </NavBarContainer>
    </>
  )
}

export default NavBar