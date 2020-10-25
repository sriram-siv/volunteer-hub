import React from 'react'
import styled from 'styled-components'

import Map from '../map/Map'
import InputText from '../elements/InputText'
import Geocoder from '../elements/Geocoder'
import SearchFields from '../elements/SearchFields'

import { getAllCampaigns } from '../../lib/api'
// import icons from '../elements/Icons'

const Wrapper = styled.main`
  position: relative;
  height: calc(100vh - 3rem);
  overflow: scroll;
`

class CampaignIndex extends React.Component {

  state = {
    campaigns: null,
    tags: ''
  }

  componentDidMount = async () => {
    const campaigns = await getAllCampaigns()
    console.log(campaigns)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  getResults = (e) => {
    if (e.keyCode !== 16) return
    console.log(this.geocoder.geoRef.state.inputValue)
  }

  render() {
    const { tags } = this.state
    const campaigns = [
      { latitude: 51.5, longitude: 0, color: '#222', size: 20 }
    ]
    return (
      <Wrapper onKeyDown={this.getResults}>
        <SearchFields>
          <Geocoder ref={geocoder => this.geocoder = geocoder} />
          <InputText name="tags" label="Tags" value={tags} returnValue={this.handleChange}/>
        </SearchFields>
        <Map pins={campaigns} />
      </Wrapper>
    )
  }
}

export default CampaignIndex