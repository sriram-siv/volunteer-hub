import React from 'react'
import Select from 'react-select'

import icons from '../elements/Icons'

class NavBar extends React.Component {

  state = {
    theme: 'light'
  }


  render() {
    const { theme } = this.state
    const options = [
      { value: 'projectA', label: 'Project A' },
      { value: 'projectB', label: 'Project B' },
      { value: 'index', label: 'Campaign Index' },
      { value: 'newCampaign', label: 'New Campaign' },
    ]
    return (
      <div className="navigation">
        <div className="left">
          {theme === 'light' ? icons.sun() : icons.moon()}
          {icons.user()}
        </div>
        <div className="center">Volunteer.io</div>
        <div className="user">
          <Select options={options} />
        </div>
      </div>
    )
  }
}

export default NavBar