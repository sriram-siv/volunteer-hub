import React from 'react'
import styled, { withTheme } from 'styled-components'

import Map from '../map/Map'
import Geocoder from '../map/Geocoder'
import InputText from '../elements/InputText'
import ResultsList from '../elements/ResultsList'

import { getAllCampaigns, updateVolunteers } from '../../lib/api'

const Wrapper = styled.main`
  position: relative;
  height: calc(100vh - 3rem);
  overflow: hidden;
`

const SearchFields = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 350px;
  z-index: 1;
  > * { margin-bottom: 5px; }
`

class CampaignIndex extends React.Component {

  state = {
    campaigns: [],
    results: null,
    location: '',
    tag: '',
    bounds: {
      _ne: { lat: 90, lng: 180 },
      _sw: { lat: -90, lng: -180 }
    },
    flyTo: null,
    resultShowingDetail: -1,
    tagError: ''
  }

  componentDidMount = async () => {
    this.getCampaigns()
  }

  // componentDidUpdate = () => this.getResults() // ? would work well with useEffect

  getCampaigns = async () => {
    const { data: campaigns } = await getAllCampaigns()
    this.setState({ campaigns }, this.getResults)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, this.getResults)
  }

  setMapRef = ref => {
    ref && ref.getMap().on('moveend', () => this.getBounds(ref))
  }
  
  setGeocoderInputRef = ref => {
    this.geocoder = ref
  }

  getResults = () => {

    const { campaigns, tag, bounds: { _sw: min, _ne: max } } = this.state

    const inRange = (value, min, max) => value > min && value < max
    const matchesQuery = ({ name }) => name.toLowerCase().includes(tag.toLowerCase())
    const invalidTagQuery = /[^\w]/.test(tag)
    const tagError = invalidTagQuery ? 'can only include alphanumeric characters' : ''

    const results = campaigns
      .filter(({ latitude, longitude }) => (
        inRange(latitude, min.lat, max.lat) && inRange(longitude, min.lng, max.lng)
      ))
      .filter(({ tags }) => (
        !tag || invalidTagQuery || tags.some(matchesQuery)
      ))
      .map((result, i) => ({ ...result, color: '#222', size: 20, number: ++i }))
    
    this.setState({ results, tagError })
  }

  getBounds = map => {
    this.setState({ bounds: map.getMap().getBounds() }, this.getResults)
  }

  flyToLocation = location => this.setState({ flyTo: location })

  selectGeocoderItem = location => {
    setTimeout(() => this.setState({ location: location.place_name }), 1)
  }

  updateGeocoderInput = e => {
    this.setState(
      { location: e.target.value },
      () => setTimeout(() => this.geocoder.focus(), 1)
    )
  }

  signUpToCampaign = async id => {
    const userID = this.props.app.currentUser()
    if (!userID) {
      this.props.app.showNotification('please login to sign up')
    } else {
      await updateVolunteers(id, { volunteer_id: userID, action: 'add' })
      this.props.app.showNotification('A request to join has been sent to the campaign coordinators')
    }
  }

  showDetail = id => this.setState({ resultShowingDetail: id })

  render() {
    const { results, tag, flyTo, resultShowingDetail, location, tagError } = this.state
    return (
      <Wrapper>
        <SearchFields>
          <Geocoder value={location} onChange={this.updateGeocoderInput} onSelect={this.selectGeocoderItem} flyToLocation={this.flyToLocation} setRef={this.setGeocoderInputRef} />
          <InputText name="tag" label="Tags" error={tagError} value={tag} returnValue={this.handleChange} />
          <ResultsList campaigns={results} signUp={this.signUpToCampaign} showDetail={this.showDetail} resultShowingDetail={resultShowingDetail} />
        </SearchFields>
        <Map pins={results} flyTo={flyTo} setRef={this.setMapRef} clickPin={this.showDetail} />
      </Wrapper>
    )
  }
}

export default withTheme(CampaignIndex)