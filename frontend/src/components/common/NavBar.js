import React from 'react'
import { withTheme } from 'styled-components'
import Select from 'react-select'

import icons from '../elements/Icons'

class NavBar extends React.Component {

  render() {
    const options = [
      { value: 'projectA', label: 'Project A' },
      { value: 'projectB', label: 'Project B' },
      { value: 'index', label: 'Campaign Index' },
      { value: 'newCampaign', label: 'New Campaign' }
    ]
    const colourStyles = {
      control: styles => ({
        ...styles,
        backgroundColor: this.props.theme.background,
        borderRadius: '2px',
        borderColor: this.props.theme.shadow,
        height: 'calc(3rem - 4px)'
      }),
      singleValue: (styles, state) => ({
        ...styles,
        color: this.props.theme.text
      })
    }
    return (
      <div className="navigation">
        <div className="left">
          <span onClick={this.props.changeTheme}>
            {this.props.theme.name === 'light' ? icons.sun() : icons.moon()}
          </span>
          {icons.user()}
        </div>
        <div className="center">Volunteer.io</div>
        <div className="user">
          <Select options={options} defaultValue={{ value: 'index', label: 'Campaign Index' }} styles={colourStyles}/>
        </div>
      </div>
    )
  }
}

export default withTheme(NavBar)