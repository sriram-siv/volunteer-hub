import React from 'react'
import styled from 'styled-components'

import BannerImage from '../elements/BannerImage'
import InputText from '../elements/InputText'
import InputArea from '../elements/InputArea'
import Button from '../elements/Button'
import Geocoder from '../map/Geocoder'
import Map from '../map/Map'

import { createCampaign } from '../../lib/api' 

const Wrapper = styled.div`
  height: calc(100vh - 3rem);
  overflow-y: scroll;
  background-color: ${props => props.theme.panels};
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: calc(100vw - 40px);
  max-width: 500px;
  height: 800px;
  > * { margin-top: 10px; }
`

const MapContain = styled.div`
  width: 100%;
  height: calc(100vw - 40px);
  max-height: 500px;
  margin: 10px auto 20px;
`

class CampaignCreate extends React.Component{
  state = {
    formData: {
      name: '',
      volunteer_count: null,
      description: '',
      latitude: '',
      longitude: '',
      start_date: null
    },
    flyTo: null
  }

  setMapRef = ref => {
    this.map = ref
  }

  selectGeocoderItem = location => {
    const formData = {
      ...this.state.formData,
      latitude: location.latitude,
      longitude: location.longitude
    }
    this.setState({ flyTo: location, formData })
  }

  setGeocoderInputRef = ref => {
    this.geocoder = ref
  }

  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.name]: event.target.value
    }
    this.setState({ formData })
  }

  handleSubmit = async () => {
    try {
      const response = await createCampaign(this.state.formData)
      const newCampaignId = response.data.id
      this.props.history.push(`/campaigns/${newCampaignId}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  render(){

    const { name, volunteer_count, description, start_date } = this.state.formData

    return (
      <Wrapper>
        <BannerImage style={{ height: '150px' }}/>
        <Form>
          <InputText width="100%" label='Give your campaign a name' name='name' value= {name} returnValue={this.handleChange} />
          <InputText width="100%" type='number' label='How many volunteers will you need?' name='volunteer_count' value={volunteer_count} returnValue={this.handleChange} />
          <InputArea width="100%" name='description' value={description} returnValue={this.handleChange} />
          <InputText width="100%" type='datetime-local' label='When does your campaign start?' name='start_date' value={start_date} returnValue={this.handleChange} />
          <Geocoder onSelect={this.selectGeocoderItem} setRef={this.setGeocoderInputRef}/>
          <MapContain>
            <Map setRef={this.setMapRef} flyTo={this.state.flyTo}/>
          </MapContain>
          <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 2 }}>
            <Button width="10rem" label='Save your campaign' onClick={this.handleSubmit}/>
          </div>
        </Form>
      </Wrapper>
    )
  }
}

export default CampaignCreate