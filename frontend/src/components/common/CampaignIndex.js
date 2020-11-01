import React from 'react'
import styled, { withTheme } from 'styled-components'

import Map from '../map/Map'
import Geocoder from '../map/Geocoder'
import InputText from '../elements/InputText'
import ResultsList from '../elements/ResultsList'

import { getAllCampaigns, addPendVolunteer } from '../../lib/api'

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

export const Notification = styled.div`
  opacity: ${props => props.visible ? 1 : 0};
  pointer-events: ${props => props.visible ? 'all' : 'none'};
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  height: calc(100vh - 3rem);
  width: 100vw;
  z-index: 10;
  background-color: #aaaa;
  transition: all 0.2s;
`

const Message = styled.div`
  position: absolute;
  top: 100px;
  width: 300px;
  height: 150px;
  background-color: ${props => props.theme.panels};
  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  font-size: 0.85rem;
  text-align: center;
  padding: 15px;
`

const Dismiss = styled.button`
  height: 2rem;
  width: 100px;
  border: 1px solid ${props => props.theme.primary};
  border-radius: 2px;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.background};
`

class CampaignIndex extends React.Component {

  state = {
    campaigns: null,
    filteredResults: null,
    tags: '',
    bounds: {
      _ne: { lat: 90, lng: 180 },
      _sw: { lat: -90, lng: -180 }
    },
    flyTo: null,
    showNotification: false,
    resultShowingDetail: -1
  }

  componentDidMount = async () => {
    const response = await getAllCampaigns()
    const campaigns = response.data
    this.setState({ campaigns }, this.getResults)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  setMapRef = ref => {
    this.map = ref
    try {
      this.map.getMap().on('moveend', this.getBounds)
    } catch (err) {
      console.log(err)
    }
  }
  
  setGeocoderInputRef = ref => {
    this.geocoder = ref
  }

  getResults = () => {
    if (!this.state.campaigns) return

    const { campaigns, bounds } = this.state

    const filteredResults = campaigns
      // Filter by visible area of map
      .filter(result => {
        const inLat = result.latitude > bounds._sw.lat && result.latitude < bounds._ne.lat
        const inLng = result.longitude > bounds._sw.lng && result.longitude < bounds._ne.lng
        return inLat && inLng
      })
      // TODO Filter by tags
      .map((result, i) => ({ ...result, color: '#222', size: 20, number: ++i }))
    this.setState({ filteredResults })
  }

  getBounds = () => {
    this.setState({ bounds: this.map.getMap().getBounds() }, this.getResults)
  }

  selectGeocoderItem = location => {
    this.setState({ flyTo: location })
  }

  signUpToCampaign = async id => {
    const userID = localStorage.getItem('user_id')
    if (!userID) {
      this.props.app.showNotification('please login to sign up')
      return
    }
    await addPendVolunteer(id)
    this.setState({ showNotification: true })
  }

  dismissNotification = () => this.setState({ showNotification: false })

  showDetail = id => {
    this.setState({ resultShowingDetail: id })
  }

  render() {
    const { filteredResults, tags, flyTo, showNotification, resultShowingDetail } = this.state
    return (
      <Wrapper>
        <Notification visible={showNotification}>
          <Message>
            Thanks<br />
            You&apos;ll be notified when the coordinators have approved you to join<br/><br/>
            <Dismiss onClick={this.dismissNotification}>ok</Dismiss>
          </Message>
        </Notification>
        <SearchFields>
          <Geocoder onSelect={this.selectGeocoderItem} setRef={this.setGeocoderInputRef} />
          <InputText name="tags" label="Tags" value={tags} returnValue={this.handleChange} />
          <ResultsList campaigns={filteredResults} signUp={this.signUpToCampaign} showDetail={this.showDetail} resultShowingDetail={resultShowingDetail} />
        </SearchFields>
        <Map pins={filteredResults} flyTo={flyTo} setRef={this.setMapRef} clickPin={this.showDetail} />
      </Wrapper>
    )
  }
}

export default withTheme(CampaignIndex)