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
  }
`

const NavBar = ({ app, history, changeTheme, theme }) => {

  const [showForm, setShowForm] = React.useState(false)
  const [showUserOptions, setShowUserOptions] = React.useState(false)

  const goToPage = page => {
    history.push(page)
    setShowUserOptions(false)
  }

  const openUserPanel = () => {
    if (!localStorage.getItem('user_id')) setShowForm(!showForm)
    else setShowUserOptions(!showUserOptions)
  }

  const handleLogin = async (id) => {
    app.getUser(id)
    setShowForm(false)
  }

  const handleLogout = () => {
    app.logout()
    goToPage('/campaigns')
  }

  return (
    <>
      <UserPanel visible={showUserOptions} openProfile={() => goToPage('/profile')} logout={handleLogout} />
      <UserForms visible={showForm} onLogin={handleLogin} app={app}/>
      <NavBarContainer>
        <Title>VolunteerHub</Title>
        <Items>
          <span onClick={openUserPanel}>
            {icons.user()}
          </span>
          <span onClick={() => goToPage('/campaigns')}>
            {icons.home()}
          </span>
          <span onClick={changeTheme}>
            {theme.name === 'light' ? icons.sun() : icons.moon()}
          </span>
        </Items>
      </NavBarContainer>
    </>
  )
}

export default withRouter(withTheme(NavBar))