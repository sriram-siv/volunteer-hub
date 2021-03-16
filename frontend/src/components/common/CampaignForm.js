/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'

import Show from './Show'

import InputText from '../elements/InputText'
import InputArea from '../elements/InputArea'
import Button from '../elements/Button'
import Geocoder from '../map/Geocoder'
import Map from '../map/Map'

import { createCampaign, getSingleCampaign, updateCampaign } from '../../lib/api' 
import { reverseGeoCode } from '../../lib/mapbox'


const Form = styled.div`
  > * { margin-top: 10px; }
`

const MapContain = styled.div`
  position: relative;
  height: calc(90vw - 40px);
  max-height: 500px;
  margin: 10px auto 20px;
  overflow: hidden;
`

// let mapRef
let geocoderRef

const CampaignForm = () => {

  const history = useHistory()
  const params = useParams()

  const [formData, setFormData] = useState({
    name: '',
    volunteer_count: '',
    description: '',
    latitude: '',
    longitude: '',
    start_date: ''
  })
  const [campaignLocation, setCampaignLocation] = useState('')
  const [flyTo, setFlyTo] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  // Returns valid string for date picker input
  const formatDate = date => date.split(':').slice(0, 2).join(':')


  useEffect(() => {
    // Prevents page loading if not logged in
    if (!localStorage.getItem('id')) history.push('/campaigns')
    
    // Pull data for edit
    if (params.id) loadData()
    // Or set date picker to current date
    else setFormData({ ...formData, start_date: formatDate(new Date().toISOString()) })
  }, [])

  const loadData = async () => {
    try {
      const { data } = await getSingleCampaign(params.id)

      // Construct formData from relevant fields
      const editFormData = [
        'name',
        'volunteer_count',
        'description',
        'banner_image',
        'latitude',
        'longitude'
      ].reduce((obj, prop) => ({ ...obj, [prop]: data[prop] }), {})

      // Correct date format for date picker
      editFormData.start_date = formatDate(data.start_date)
      // Get owner id
      editFormData.owner = data.owner.id

      setFormData(editFormData)

      // Get location name from mapbox api
      const { latitude, longitude } = data
      const geo = await reverseGeoCode({ latitude, longitude })
      setCampaignLocation(geo.data.features[0].place_name)

      setFlyTo({ latitude, longitude, zoom: 4 })
      setIsEdit(true)

    } catch (err) {
      console.error(err)
    }
  }

  // const setMapRef = ref => mapRef = ref

  const setGeocoderRef = ref => geocoderRef = ref

  // onSelect Geocoder results item
  const flyToLocation = location => {

    setFormData({
      ...formData,
      latitude: location.latitude,
      longitude: location.longitude
    })

    setFlyTo(location)
  }

  const onGeocoderSelect = item => {
    setTimeout(() => setCampaignLocation(item.place_name), 1)
  }

  const updateGeocoderInput = event => {
    setCampaignLocation(event.target.value)
    // TODO bug check this
    setTimeout(() => geocoderRef.focus(), 1)
  }

  const updateControlledInput = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async () => {
    try {
      const response = isEdit
        ? await updateCampaign(params.id, formData)
        : await createCampaign(formData)
      history.push(`/campaigns/${response.data.id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const showImagePicker = () => {
    const widget = window.cloudinary.createUploadWidget(
      { 
        cloudName: 'dmhj1vjdf',
        uploadPreset: 'jisx4gi0',
        showUploadMoreButton: false
      },
      (error, result) => {
        if (result?.event === 'success') { 
          setFormData({ ...formData, banner_image: result.info.url })
        }
      }
    )
    widget.open()
  }


  const { name, volunteer_count, description, start_date, banner_image } = formData

  const action = {
    label: 'save campaign',
    click: handleSubmit
  }

  return (

    <Show title={isEdit ? 'edit campaign' : 'new campaign'} banner={banner_image} action={action}>

      <Form>
        <InputText label='Give your campaign a name' name='name' value={name} returnValue={updateControlledInput} />
        <Button onClick={showImagePicker}>pick banner image</Button>
        <InputArea label='Give your campaign a description' name='description' value={description} height="20rem" returnValue={updateControlledInput} />
        <InputText label='How many volunteers will you need?' name='volunteer_count' value={volunteer_count} type='number' returnValue={updateControlledInput} />
        <InputText label='When does your campaign start?' name='start_date' value={start_date} type='datetime-local' returnValue={updateControlledInput} />

        <Geocoder
          flyToLocation={flyToLocation}
          onSelect={onGeocoderSelect}
          onChange={updateGeocoderInput}
          setRef={setGeocoderRef}
          value={campaignLocation}
        />

        <MapContain>
          {/* <Map setRef={setMapRef} flyTo={flyTo}/> */}
          <Map flyTo={flyTo}/>
        </MapContain>
      </Form>

    </Show>
  )
}

export default CampaignForm