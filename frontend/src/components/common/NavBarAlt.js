import React from 'react'
import { withRouter } from 'react-router-dom'
import styled, { withTheme } from 'styled-components'

import icons from '../../lib/icons'
import UserForms from '../elements/UserForms'
import UserPanel from '../elements/UserPanel'

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

const Items = styled.div`
  position: absolute;
  right: 25px;
  > * {
    margin-left: 10px;
    cursor: pointer;
  }
`

const NavBar = ({ app, history, changeTheme, theme }) => {

  const [showForm, setShowForm] = React.useState(false)

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
      <UserForms visible={showForm} onLogin={() => setShowForm(!showForm)} app={app}/>
      <NavBarContainer>
        <Title>VolunteerHub</Title>
        <Items>
          {app.currentUser() ? navUser : navGuest }
        </Items>
      </NavBarContainer>
    </>
  )
}

export default withRouter(withTheme(NavBar))