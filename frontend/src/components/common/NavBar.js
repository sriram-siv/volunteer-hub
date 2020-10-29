import React from 'react'
import { withRouter } from 'react-router-dom'
import styled, { withTheme } from 'styled-components'
import Select from 'react-select'

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
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: this.props.theme.background,
      color: this.props.theme.text,
      borderRadius: '2px'
    })
  }
  
  componentDidMount = () => {
    
  }

  selectSection = (event) => {
    this.props.history.push(event.value)
  }

  openUserPanel = () => {
    if (!localStorage.getItem('user_id')) this.setState({ showForm: !this.state.showForm })
    else this.setState({ showUserOptions: !this.state.showUserOptions })
  }

  openProfile = () => {
    this.props.history.push('/profile')
    this.setState({ showUserOptions: false })
  }

  handleLogin = async (id) => {
    this.props.app.getUser(id)
    this.setState({ showForm: false })
  }

  handleLogout = () => {
    this.props.app.logout()
    this.setState({ showUserOptions: false })
    this.props.history.push('/campaigns')
  }

  render() {
    let options = [{ value: '/campaigns', label: 'Campaign Index' }]
    if (localStorage.getItem('user_id')) options.push({ value: '/campaigns/new', label: 'New Campaign' })
    const { changeTheme, theme, campaignList } = this.props
    const { showForm, showUserOptions } = this.state

    if (this.props.location.pathname === '/') return null

    if (campaignList) options = [...campaignList, ...options]
    
    return (
      <>
        <UserPanel visible={showUserOptions} openProfile={this.openProfile} logout={this.handleLogout} />
        <UserForms visible={showForm} onLogin={this.handleLogin} app={this.props.app}/>
        <NavBarContainer>
          <div className="nav-left">
            <span onClick={changeTheme}>
              {theme.name === 'light' ? icons.sun() : icons.moon()}
            </span>
            <span onClick={this.openUserPanel}>
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