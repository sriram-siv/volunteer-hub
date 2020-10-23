import React from 'react'

import Map from '../map/Map'
import InputText from '../elements/InputText'
import Geocoder from '../elements/Geocoder'
import SearchFields from '../elements/SearchFields'

import { getAllCampaigns } from '../../lib/api'
// import icons from '../elements/Icons'

class CampaignIndex extends React.Component {

  state = {
    campaigns: null
  }

  componentDidMount = async () => {
    const campaigns = await getAllCampaigns()
    console.log(campaigns)
  }

  getResults = () => {
    this.setState({ showResults: true })
    console.log(this.geocoder.geoRef.state.inputValue)
  }


  render() {
    const campaigns = [
      { latitude: 51.5, longitude: 0, color: '#222', size: 20 }
    ]
    return (
      <div>
        <div className="campaign-index-map">
          <SearchFields>
            <Geocoder ref={geocoder => this.geocoder = geocoder} />
            <InputText label="Tags" />
          </SearchFields>
          <Map pins={campaigns} />
        </div>
      </div>
    )
  }
}

export default CampaignIndex