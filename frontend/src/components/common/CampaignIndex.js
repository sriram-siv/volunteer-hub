import React from 'react'

import Map from '../map/Map'
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
        {/* <div className="header">
          <div className="title">Find projects for you</div>
          <div className="subtitle">something to suit your skills</div>
        </div> */}
        <div className="campaign-index-map">
          <div className="geocode">
            GeoCoder
            <span className="temp-icons">findme</span>
          </div>
          <div className="tag-search">tags</div>
          <div className="skill-search">skills</div>
          <div className="campaign-list">Campaign List</div>
          <Map pins={campaigns} />
        </div>
      </div>
    )
  }
}

export default CampaignIndex