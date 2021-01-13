/* eslint-disable camelcase */
import React from 'react'
import styled from 'styled-components'

import BannerImage from '../elements/BannerImage'
import InputText from '../elements/InputText'
import InputArea from '../elements/InputArea'
import Button from '../elements/Button'
import Geocoder from '../map/Geocoder'
import Map from '../map/Map'

import { createCampaign, getSingleCampaign, updateCampaign } from '../../lib/api' 

const Wrapper = styled.div`
  height: calc(100vh - 3rem);
  overflow-y: scroll;
  background-color: ${props => props.theme.panels};
`

const Form = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  margin: 0 auto;
  width: calc(100vw - 40px);
  max-width: 500px;
  height: 800px;
  > * { margin-top: 10px; }
`

const GeoWrapper = styled.div`
  position: relative;
  width: calc(100vw - 40px);
  max-width: 500px;
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
    flyTo: null,
    isEdit: false
  }

  componentDidMount = () => {
    // Prevents page loading if not logged in
    if (!localStorage.getItem('user_id')) this.props.history.push('/campaigns')

    // Pull data for edit
    if (this.props.match.params.id) this.loadData()
  }

  loadData = async () => {
    try {
      const response = await getSingleCampaign(this.props.match.params.id)

      const formData = {
        name: response.data.name,
        volunteer_count: response.data.volunteer_count,
        description: response.data.description,
        banner_image: response.data.banner_image,
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        start_date: response.data.start_date.replace('Z', ''),
        owner: response.data.owner.id
      }

      this.setState({ formData, isEdit: true })
    } catch (err) {
      console.log(err)
    }
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


      const response = this.state.isEdit
        ? await updateCampaign(this.props.match.params.id, this.state.formData)
        : await createCampaign(this.state.formData)
      const newCampaignId = response.data.id
      this.props.history.push(`/campaigns/${newCampaignId}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      { 
        cloudName: 'dmhj1vjdf',
        uploadPreset: 'jisx4gi0',
        showUploadMoreButton: false
      },
      (error, result) => {
        if (!error && result && result.event === 'success') { 
          const banner_image = result.info.url
          this.setState({ formData: { ...this.state.formData, banner_image } })
        }
      })
    widget.open()
  }

  render(){

    const { name, volunteer_count, description, start_date, banner_image } = this.state.formData

    return (
      <Wrapper>
        <BannerImage style={{ height: '150px' }} src={banner_image}/>
        <Form>
          <InputText width="100%" label='Give your campaign a name' name='name' value= {name} returnValue={this.handleChange} />
          <InputArea height="20rem" width="100%" name='description' value={description} returnValue={this.handleChange} label='Give your campaign a description' submit={() => null}/>
          <InputText width="100%" type='number' label='How many volunteers will you need?' name='volunteer_count' value={volunteer_count} returnValue={this.handleChange} />
          <InputText width="100%" type='datetime-local' label='When does your campaign start?' name='start_date' value={start_date} returnValue={this.handleChange} />
          <GeoWrapper>
            <Geocoder onSelect={this.selectGeocoderItem} setRef={this.setGeocoderInputRef} />
          </GeoWrapper>
          <MapContain>
            <Map setRef={this.setMapRef} flyTo={this.state.flyTo}/>
          </MapContain>
          <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 2 }}>
            <Button width="10rem" label='Save our campaign' onClick={this.handleSubmit}/>
          </div>
          <div style={{ position: 'fixed', bottom: '85px', right: '25px', zIndex: 2 }}>
            <Button width="10rem" label='Change banner image' onClick={this.showWidget}/>
          </div>
        </Form>
      </Wrapper>
    )
  }
}

export default CampaignCreate