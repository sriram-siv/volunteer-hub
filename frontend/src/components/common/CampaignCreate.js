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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 auto;
  width: 60vw;
  height: 800px;
`

const MapContain = styled.div`
  width: 60vw;
  height: 60vh;
  margin: 0 auto;
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

  inputWidth = '80%'
  buttonWidth = '60%'

  render(){

    const { name, volunteer_count, description, start_date } = this.state.formData

    return (
      <>
        <BannerImage style={{ height: '150px' }}/>
        <Wrapper>
          <InputText width={this.inputWidth} label='Give your campaign a name...' name='name' value= {name} returnValue={this.handleChange} />
          <InputText width={this.inputWidth} type='number' label='How many volunteers will you need?' name='volunteer_count' value={volunteer_count} returnValue={this.handleChange} />
          <InputArea width={this.inputWidth} name='description' value={description} returnValue={this.handleChange} />
          <InputText width={this.inputWidth} type='datetime-local' label='When does your campaign start?' name='start_date' value={start_date} returnValue={this.handleChange} />
          <Geocoder onSelect={this.selectGeocoderItem} setRef={this.setGeocoderInputRef} width={this.inputWidth}/>
          <MapContain>
            <Map setRef={this.setMapRef} flyTo={this.state.flyTo}/>
          </MapContain>
          <Button width={this.buttonWidth} label='Save your campaign' onClick={this.handleSubmit}/>
        </Wrapper>
      </>
    )
  }
}

export default CampaignCreate