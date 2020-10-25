import React from 'react'
import { withRouter } from 'react-router-dom'
import styled, { withTheme } from 'styled-components'
import Select from 'react-select'

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

class NavBar extends React.Component {

  state = {
    showForm: false
  }

  selectSection = (e) => {
    this.props.history.push(e.value)
  }

  openProfile = () => {
    // check if logged in. if not open form
    this.setState({ showForm: !this.state.showForm })
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

  render() {
    const options = [
      { value: '/campaigns/35fs3', label: 'My Campaign' },
      { value: '/campaigns', label: 'Campaign Index' },
      { value: 'newCampaign', label: 'New Campaign' }
    ]
    const { changeTheme, theme } = this.props
    
    return (
      <>
        {this.state.showForm && <UserForms />}
        <NavBarContainer>
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