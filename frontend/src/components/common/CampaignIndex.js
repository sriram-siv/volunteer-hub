import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { AppContext } from '../../App'

import Map from '../map/Map'
import Geocoder from '../map/Geocoder'
import InputText from '../elements/InputText'
import ResultsList from '../elements/ResultsList'

import { getAllCampaigns, updateVolunteers } from '../../lib/api'

const Wrapper = styled.main`
  position: relative;
  width: 100%;
  height: calc(100vh - 3rem);
  overflow: hidden;
`

const SearchFields = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 350px;
  max-width: calc(100vw - 20px);
  z-index: 1;
  > * { margin-bottom: 5px; }

  @media only screen and (max-width: 425px) {
    width: calc(100vw - 20px);
  }
`

let geocoderRef = null

const CampaignIndex = () => {

  const app = useContext(AppContext)

  const [campaigns, setCampaigns] = useState([])
  const [results, setResults] = useState([])
  const [location, setLocation] = useState('')
  const [tag, setTag] = useState('')
  const [bounds, setBounds] = useState({
    ne: { lat: 90, lng: 180 },
    sw: { lat: -90, lng: -180 }
  })
  const [flyTo, setFlyTo] = useState(null)
  const [resultShowingDetail, setResultShowingDetail] = useState(-1)
  const [tagError, setTagError] = useState('')

  const getCampaigns = () => getAllCampaigns().then(
    res => {
      console.log(res)
      setCampaigns(res.data)
    },
    res => {
      console.error({ res })
      app.setNotification({ message: 'Error loading campaign index. Please try refreshing the page' })
    }
  )

  const attachMapBoundsListener = ref => {
    if (ref) {
      ref.getMap()._listeners.moveend = [() => getBounds(ref)]
    }
  }

  const attachGeocoder = ref => {
    geocoderRef = ref
  }

  const getResults = () => {

    const { sw: min, ne: max } = bounds

    const inRange = (value, min, max) => value > min && value < max
    const matchesQuery = ({ name }) => name.toLowerCase().includes(tag.toLowerCase())
    const invalidTagQuery = /[^\w]/.test(tag)

    setTagError(invalidTagQuery ? 'can only include alphanumeric characters' : '')

    setResults(
      campaigns
        .filter(({ latitude, longitude }) => (
          inRange(latitude, min.lat, max.lat) && inRange(longitude, min.lng, max.lng)
        ))
        .filter(({ tags }) => (
          !tag || invalidTagQuery || tags.some(matchesQuery)
        ))
        .map((result, i) => ({ ...result, color: '#222', size: 20, number: ++i }))
    )
  }

  const getBounds = ref => {
    const { _ne: ne, _sw: sw } = ref?.getMap().getBounds()
    setBounds({ ne, sw })
  }

  const selectGeocoderItem = location => {
    setTimeout(() => setLocation(location.place_name), 1)
  }

  const updateGeocoderInput = event => {
    setLocation(event.target.value)
    setTimeout(() => geocoderRef.focus(), 1)
  }

  const signUpToCampaign = async id => {
    const userID = app.userID()
    if (userID) {
      await updateVolunteers(id, { volunteer_id: userID, action: 'add' })
      app.setNotification({ message: 'A request to join has been sent to the campaign coordinators' })
    } else {
      app.setNotification({ message: 'please login to sign up' })
    }
  }

  const showDetail = id => {
    setResultShowingDetail(resultShowingDetail === id ? -1 : id)
  }

  useEffect(getCampaigns, [])
  useEffect(getResults, [campaigns, location, tag, bounds])

  return (
    <Wrapper>

      <SearchFields>
        <Geocoder
          value={location}
          onChange={updateGeocoderInput}
          onSelect={selectGeocoderItem}
          flyToLocation={setFlyTo}
          setRef={attachGeocoder}
        />
        <InputText
          name="tag"
          label="Tags"
          value={tag}
          error={tagError}
          returnValue={e => setTag(e.target.value)}
        />
        <ResultsList
          campaigns={results}
          signUp={signUpToCampaign}
          showDetail={showDetail}
          resultShowingDetail={resultShowingDetail}
        />
      </SearchFields>

      <Map
        pins={results}
        flyTo={flyTo}
        setRef={attachMapBoundsListener}
        clickPin={showDetail}
      />

    </Wrapper>
  )
}

export default CampaignIndex