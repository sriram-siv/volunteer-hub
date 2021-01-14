import React from 'react'
import styled from 'styled-components'
import GeocoderGL from 'react-mapbox-gl-geocoder'

import GeocoderInput from './GeocoderInput'

const Item = styled.div`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 10px;
  &:hover {
    background-color: ${props => props.theme.primary};
    color: #333;
  }
`

const Geocoder = ({ width, value, onSelect, onChange, flyToLocation, setRef }) => {
  return (
    <GeocoderGL
      viewport={{}} // set to empty as we are handling connection to map component manually
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}

      inputComponent={inputProps => (
        <GeocoderInput setRef={setRef} width={width} label="Location" value={value} onChange={onChange} inputProps={{ ...inputProps }} />)}
      
      // Click capture is needed here to allow onSelected to retain functionality
      itemComponent={itemProps => (
        <Item {...itemProps} onClickCapture={() => onSelect(itemProps.item)} />)}

      onSelected={flyToLocation}
      initialInputValue={value}
      timeout={150}
        
      // updateInputOnSelect
    />
  )
}

export default Geocoder