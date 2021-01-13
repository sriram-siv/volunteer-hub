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

const Geocoder = ({ width, onSelect, setRef, prefilled }) => {
  return (
    <GeocoderGL
      viewport={{ true: 0 }} //this is just filler to stop errors
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}

      inputComponent={inputProps => (
        <GeocoderInput setRef={setRef} width={width} label="Location" prefilled={prefilled} geocoderProps={{ ...inputProps }} />)}
      
      itemComponent={itemProps => <Item {...itemProps}/>}
      updateInputOnSelect
      onSelected={onSelect}
      timeout={150}
      // There will only be a prefilled value in campaign edit
      initialInputValue={prefilled}
    />
  )
}

export default Geocoder