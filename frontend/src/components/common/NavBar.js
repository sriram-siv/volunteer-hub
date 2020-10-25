import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import Select from 'react-select'

import icons from '../elements/Icons'
import UserForms from '../elements/UserForms'

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

  render() {
    const options = [
      { value: '/campaigns/35fs3', label: 'My Campaign' },
      { value: '/campaigns', label: 'Campaign Index' },
      { value: 'newCampaign', label: 'New Campaign' }
    ]
    const colourStyles = {
      control: styles => ({
        ...styles,
        backgroundColor: this.props.theme.background,
        borderRadius: '2px',
        borderColor: this.props.theme.shadow,
        height: 'calc(2rem)'
      }),
      singleValue: (styles, state) => ({
        ...styles,
        color: this.props.theme.text
      })
    }
    return (
      <>
        {this.state.showForm && <UserForms />}
        <div className="navigation">
          <div className="left">
            <span onClick={this.props.changeTheme}>
              {this.props.theme.name === 'light' ? icons.sun() : icons.moon()}
            </span>
            <span onClick={this.openProfile}>
              {icons.user()}
            </span>
          </div>
          <div className="center">Volunteer.io</div>
          <div className="user">
            <Select
              styles={colourStyles}
              options={options}
              defaultValue={{ value: '/campaigns', label: 'Campaign Index' }}
              onChange={this.selectSection}
            />
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(withTheme(NavBar))