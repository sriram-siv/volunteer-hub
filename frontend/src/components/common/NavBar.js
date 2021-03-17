import React, { useState, useContext } from 'react'
import { useLocation, Link } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'

import { AppContext } from '../../App'

import icons from '../../lib/icons'
import UserForms from '../elements/UserForms'

const NavBarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  background-color: ${props => props.theme.primary};
  position: relative;
  z-index: 10;
`

const Title = styled.h1`
  padding-left: 30px;
  margin: 0;
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 1.1rem;
  pointer-events: none;
`

const Items = styled.ul`

  display: flex;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;

  button {
    background-color: transparent;
    border: none;

    svg {
      position: relative;
      top: -1px;
    }
  }

  button, a {
    width: 2.5rem;
    min-width: fit-content;
    height: 3rem;
    line-height: 3rem;
    text-align: center;

    &:focus { outline: none; }
    &:focus-visible {
      background-color: #333;
      color: white;

      path {
        fill: white;
      }
    }
  }
`

const Tooltip = styled.label`

  position: absolute;
  bottom: calc(-2rem - 13px);
  left: ${props => props.position + 'px'};

  transition: left 0.2s;

  transform: translateX(-50%);
  width: 100px;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background-color: ${props => props.theme.panels}cc;
  border-radius: 2px;
  color: ${props => props.theme.text};
  font-weight: ${props => props.theme.fontWeight};
  letter-spacing: ${props => props.theme.letterSpacing};
`

const NavBar = () => {

  const app = useContext(AppContext)
  const theme = useContext(ThemeContext)

  const location = useLocation()

  const [showForm, setShowForm] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState(-1)
  const [tooltipLabel, setTooltipLabel] = useState('')

  if (location.pathname === '/') return null

  const showTooltip = event => {
    const { x, width } = event.target.getBoundingClientRect()

    const maxPositionX = window.innerWidth - 54
    const itemPosition = x + (width / 2)

    setTooltipPosition(Math.min(itemPosition, maxPositionX))
    setTooltipLabel(event.target.getAttribute('label'))
  }

  const hideTooltip = () => setTooltipPosition(-1)

  const navUser = <>

    <Link
      label="profile"
      to='/profile'
      onClick={() => setTooltipPosition(-1)}
      onMouseEnter={showTooltip}
      onFocus={showTooltip}
      onMouseLeave={hideTooltip}
      onBlur={hideTooltip}
    >
      {icons.user()}
    </Link>
    <Link
      label="campaigns"
      to='/campaigns'
      onClick={() => setTooltipPosition(-1)}
      onMouseEnter={showTooltip}
      onFocus={showTooltip}
      onMouseLeave={hideTooltip}
      onBlur={hideTooltip}
    >
      {icons.home()}
    </Link>
    <button
      label={theme.name === 'light' ? 'dark mode' : 'light mode'}
      onClick={() => {
        app.changeTheme()
        setTooltipPosition(-1)
      }}
      onMouseEnter={showTooltip}
      onFocus={showTooltip}
      onMouseLeave={hideTooltip}
      onBlur={hideTooltip}
    >
      {theme.name === 'light' ? icons.sun() : icons.moon()}
    </button>
  </>

  const navGuest = <>
    <button onClick={() => setShowForm(!showForm)}>
      login
    </button>
  </>

  return (
    <>
      <NavBarContainer>
        <Title>VolunteerHub</Title>
        <Items>
          {app.user ? navUser : navGuest }
        </Items>
        {tooltipPosition > -1 && tooltipLabel &&
          <Tooltip position={tooltipPosition}>
            {tooltipLabel}
          </Tooltip>
        }
      </NavBarContainer>
      <UserForms visible={showForm && !app.user} hideForm={() => setShowForm(false)} />
    </>
  )
}

export default NavBar