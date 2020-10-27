import React from 'react'
import { withRouter } from 'react-router-dom'
import styled, { withTheme } from 'styled-components'
import Select from 'react-select'

import icons from '../../lib/icons'
import UserForms from '../elements/UserForms'

import { getSingleProfile } from '../../lib/api'

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  background-color: ${props => props.theme.primary};
  position: relative;
  z-index: 10;
`

class NavBar extends React.Component {

  state = {
    showForm: false,
    showUserOptions: false
  }

  selectStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: this.props.theme.background,
      borderRadius: '2px',
      borderColor: this.props.theme.shadow,
      height: 'calc(2rem)'
    }),
    singleValue: (styles) => ({
      ...styles,
      color: this.props.theme.text,
      fontWeight: this.props.theme.fontWeight,
      letterSpacing: this.props.theme.letterSpacing,
      fontSize: '0.85rem'
    })
  }

  componentDidMount = () => {
    
  }

  selectSection = (event) => {
    this.props.history.push(event.value)
  }

  openProfile = () => {
    if (!localStorage.getItem('user_id')) this.setState({ showForm: !this.state.showForm })
    else this.props.history.push('/profile')
  }

  handleLogin = async (id) => {
    this.props.app.getUser(id)
    this.setState({ showForm: false })
  }

  render() {
    let options = [
      { value: '/campaigns', label: 'Campaign Index' },
      { value: '/campaigns/new', label: 'New Campaign' }
    ]
    const { changeTheme, theme, campaignList } = this.props
    const { showForm } = this.state

    if (this.props.location.pathname === '/') return null

    if (campaignList) options = [...campaignList, ...options] 
    
    return (
      <>
        <UserForms visible={showForm} onLogin={this.handleLogin}/>
        <NavBarContainer onKeyDown={this.logout}>
          <div className="nav-left">
            <span onClick={changeTheme}>
              {theme.name === 'light' ? icons.sun() : icons.moon()}
            </span>
            <span onClick={this.openProfile}>
              {icons.user()}
            </span>
          </div>
          <div className="nav-center">Volunteer.io</div>
          <div className="nav-right">
            <Select
              styles={this.selectStyles}
              options={options}
              defaultValue={{ value: '/campaigns', label: 'Campaign Index' }}
              onChange={this.selectSection}
            />
          </div>
        </NavBarContainer>
      </>
    )
  }
}

export default withRouter(withTheme(NavBar))