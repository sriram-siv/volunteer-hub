import React from 'react'
import styled, { withTheme } from 'styled-components'

import Map from '../map/Map'
import Geocoder from '../map/Geocoder'
import InputText from '../elements/InputText'
import ResultsList from '../elements/ResultsList'

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
  width: 350px;
  z-index: 1;
  > * { margin-bottom: 5px; }
`

const Notification = styled.div`
  position: absolute;
  top: 0;
  height: calc(100vh - 3rem);
  background-color: #050a;
`

class CampaignIndex extends React.Component {

  state = {
    campaigns: null,
    tags: '',
    flyTo: null
  }

  componentDidMount = async () => {
    const response = await getAllCampaigns()
    const campaigns = response.data
    this.setState({ campaigns })
    // console.log(campaigns)
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

  signUpToCampaign = id => {
    console.log(id)
    // TODO call api for add to pending
    console.log(this.props.theme)
  }

  render() {
    const { campaigns, tags, flyTo } = this.state
    return (
      <Wrapper onKeyDown={this.getResults}>
        <Notification/>
        <SearchFields>
          <Geocoder onSelect={this.selectGeocoderItem} setRef={this.setGeocoderInputRef} />
          <InputText name="tags" label="Tags" value={tags} returnValue={this.handleChange} />
          <ResultsList campaigns={campaigns} signUp={this.signUpToCampaign}/>
        </SearchFields>
        <Map pins={campaigns} flyTo={flyTo} setRef={this.setMapRef} />
      </Wrapper>
    )
  }
}

export default withTheme(CampaignIndex)