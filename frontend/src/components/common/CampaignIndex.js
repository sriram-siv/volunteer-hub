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
    tags: '',
    flyTo: null,
    showNotification: false
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
    this.setState({ showNotification: true })
  }

  dismissNotification = () => this.setState({ showNotification: false })

  render() {
    const { campaigns, tags, flyTo, showNotification } = this.state
    return (
      <Wrapper onKeyDown={this.getResults}>
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
          <ResultsList campaigns={campaigns} signUp={this.signUpToCampaign}/>
        </SearchFields>
        <Map pins={campaigns} flyTo={flyTo} setRef={this.setMapRef} />
      </Wrapper>
    )
  }
}

export default withTheme(CampaignIndex)