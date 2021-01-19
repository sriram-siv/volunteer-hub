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
import { reverseGeoCode } from '../../lib/mapbox'

const Wrapper = styled.div`
  height: calc(100vh - 3rem);
  overflow-y: scroll;
  background-color: ${props => props.theme.panels};
`

const Form = styled.div`
  margin: 0 auto;
  width: calc(100vw - 40px);
  max-width: 500px;
  height: 800px;
  > * { margin-top: 10px; }
`

const MapContain = styled.div`
  height: calc(100vw - 40px);
  max-height: 500px;
  margin: 10px auto 20px;
  overflow: hidden;
`

class CampaignForm extends React.Component {
  state = {
    formData: {
      name: '',
      volunteer_count: '',
      description: '',
      latitude: '',
      longitude: '',
      start_date: ''
    },
    campaignLocation: '',
    flyTo: null,
    isEdit: false
  }

  componentDidMount = () => {
    // Prevents page loading if not logged in
    if (!localStorage.getItem('user_id')) this.props.history.push('/campaigns')
    
    // Pull data for edit
    if (this.props.match.params.id) this.loadData()
    // Or set date picker to current date
    else this.setState({ formData: { ...this.state.formData, start_date: this.formatDate(new Date().toISOString()) } })
  }

  // Returns valid string for date picker input
  formatDate = date => date.split(':').slice(0, 2).join(':')

  loadData = async () => {
    try {
      const response = await getSingleCampaign(this.props.match.params.id)

      // const formData = {
      //   name: response.data.name,
      //   volunteer_count: response.data.volunteer_count,
      //   description: response.data.description,
      //   banner_image: response.data.banner_image,
      //   latitude: response.data.latitude,
      //   longitude: response.data.longitude,
      //   start_date: response.data.start_date.replace('Z', ''),
      //   owner: response.data.owner.id
      // }

      // Construct formData from relevant fields
      const formData = [
        'name',
        'volunteer_count',
        'description',
        'banner_image',
        'latitude',
        'longitude'
      ].reduce((obj, prop) => ({ ...obj, [prop]: response.data[prop] }), {})

      // Correct date format for date picker
      formData.start_date = this.formatDate(response.data.start_date)
      // Get owner id
      formData.owner = response.data.owner.id

      // Get location name from mapbox api
      const { latitude, longitude } = response.data
      const geoData = await reverseGeoCode({ latitude, longitude })
      const campaignLocation = geoData.data.features[0].place_name

      this.setState({ formData, campaignLocation, flyTo: { latitude, longitude, zoom: 4 }, isEdit: true })

    } catch (err) {
      console.error(err)
    }
  }

  setMapRef = ref => {
    this.map = ref
  }

  setGeocoderInputRef = ref => {
    this.geocoder = ref
  }

  
  // Use geocoder input as controlled component
  // Necessary to use this method as the geocoder component does not allow enough access
  // to its elements to control it in the normal way
  // setGeocoderInputRef = ref => {
  //   this.geocoder = ref

  // setTimeout(() => {
    
  //   if (this.geocoder.value !== this.state.campaignLocation) {
  //     this.setState({ campaignLocation: this.geocoder.value })
      
  //     setTimeout(() => this.geocoder.focus(), 1)
  //   }
  // }, 1)
  // }

  // Previous version
  // Receives a reference for the geocoder input element on mount or update
  // Timeouts are needed to allow the component to mount / update before updating
  // setGeocoderInputRef = ref => {
  //   this.geocoder = ref
  //   setTimeout(() => {
  //     // Remove default value to allow input label to change on focus 
  //     if (!this.geocoder?.value && this.state.campaignLocation) {
  //       this.setState({ campaignLocation: null })
  //       // Refocus input
  //       setTimeout(() => this.geocoder?.focus(), 1)
  //     }
  //   }, 1)
  // }

  // onSelect Geocoder results item
  flyToLocation = location => {

    const formData = {
      ...this.state.formData,
      latitude: location.latitude,
      longitude: location.longitude
    }

    this.setState({ flyTo: location, formData })
  }

  onGeocoderSelect = item => {
    setTimeout(() => this.setState({ campaignLocation: item.place_name }), 1)
  }

  updateGeocoderInput = event => {
    this.setState(
      { campaignLocation: event.target.value },
      () => this.geocoder.focus()
    )
  }

  updateControlledInput = event => {
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
      this.props.history.push(`/campaigns/${response.data.id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  showImagePicker = () => {
    const widget = window.cloudinary.createUploadWidget(
      { 
        cloudName: 'dmhj1vjdf',
        uploadPreset: 'jisx4gi0',
        showUploadMoreButton: false
      },
      (error, result) => {
        if (result?.event === 'success') { 
          this.setState({ formData: { ...this.state.formData, banner_image: result.info.url } })
        }
      }
    )
    widget.open()
  }

  render(){

    const { name, volunteer_count, description, start_date, banner_image } = this.state.formData
    const { campaignLocation } = this.state

    return (
      <Wrapper>
        <BannerImage style={{ height: '150px' }} src={banner_image}/>
        <Form>
          <InputText label='Give your campaign a name' name='name' value={name} returnValue={this.updateControlledInput} />
          <InputArea label='Give your campaign a description' name='description' value={description} height="20rem" returnValue={this.updateControlledInput} />
          <InputText label='How many volunteers will you need?' name='volunteer_count' value={volunteer_count} type='number' returnValue={this.updateControlledInput} />
          <InputText label='When does your campaign start?' name='start_date' value={start_date} type='datetime-local' returnValue={this.updateControlledInput} />

          <Geocoder
            flyToLocation={this.flyToLocation}
            onSelect={this.onGeocoderSelect}
            onChange={this.updateGeocoderInput}
            setRef={this.setGeocoderInputRef}
            value={campaignLocation}
          />

          <MapContain>
            <Map setRef={this.setMapRef} flyTo={this.state.flyTo}/>
          </MapContain>
          <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 2 }}>
            <Button width="10rem" label='Save your campaign' onClick={this.handleSubmit}/>
          </div>
          <div style={{ position: 'fixed', bottom: '85px', right: '25px', zIndex: 2 }}>
            <Button width="10rem" label='Change banner image' onClick={this.showImagePicker}/>
          </div>
        </Form>
      </Wrapper>
    )
  }
}

export default CampaignForm