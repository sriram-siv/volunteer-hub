import React from 'react'

import Map from '../map/Map'
import InputText from '../elements/InputText'
import Button from '../elements/Button'
// import icons from '../elements/Icons'

class CampaignIndex extends React.Component {

  state = {
    campaigns: null
  }

  componentDidMount = () => {
    // Get all Campaigns and load to state
  }


  render() {
    const campaigns = [
      { latitude: 51.5, longitude: 0, color: '#222', size: 20 }
    ]
    return (
      <div>
        <div className="campaign-index-map">
          <div className="search-fields">
            <InputText label="Location"/>
            <InputText label="Tags" />
            <Button />
          </div>
          <Map pins={campaigns} />
        </div>
      </div>
    )
  }
}

export default CampaignIndex