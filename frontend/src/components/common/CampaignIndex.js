import React from 'react'
import styled from 'styled-components'

import Map from '../map/Map'
import Geocoder from '../map/Geocoder'
import InputText from '../elements/InputText'

import { getAllCampaigns } from '../../lib/api'

const Wrapper = styled.main`
  position: relative;
  height: calc(100vh - 3rem);
  overflow: scroll;
`

const SearchFields = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  height: 2rem;
  width: 350px;
  z-index: 1;
  > * { margin-bottom: 5px; }
`

class CampaignIndex extends React.Component {

  state = {
    campaigns: null,
    tags: '',
    flyTo: null
  }

  componentDidMount = async () => {
    const campaigns = await getAllCampaigns()
    console.log(campaigns)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  setMapRef = ref => {
    this.map = ref
  }
  
  setGeocoderInputRef = ref => {
    this.geocoder = ref
  }

  getResults = (e) => {
    if (e.keyCode !== 16) return
    console.log(this.geocoder.state.inputValue)
    console.log(this.map.getMap().getBounds())
  }

  selectGeocoderItem = location => {
    this.setState({ flyTo: location })
  }

  render() {
    const { tags, flyTo } = this.state
    const campaigns = [
      { latitude: 51.5, longitude: 0, color: '#222', size: 20 }
    ]
    return (
      <Wrapper onKeyDown={this.getResults}>
        <SearchFields>
          <Geocoder onSelect={this.selectGeocoderItem} setRef={this.setGeocoderInputRef} />
          <InputText name="tags" label="Tags" value={tags} returnValue={this.handleChange}/>
        </SearchFields>
        <Map pins={campaigns} flyTo={flyTo} setRef={this.setMapRef} />
      </Wrapper>
    )
  }
}

export default CampaignIndex