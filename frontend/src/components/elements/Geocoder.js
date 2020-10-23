import React from 'react'
// import styled from 'styled-components'
import GeocoderGL from 'react-mapbox-gl-geocoder'

// import InputText from './InputText'
import GeocoderInput from './GeocoderInput'
import GeocoderItem from './GeocoderItem'

class Geocoder extends React.Component {

  selectItem = location => {
    console.log(location)
  }

  render() {

    const input = (inputProps) => {
      return (
        <GeocoderInput
          width={this.props.width}
          label="Location"
          geocoderProps={{ ...inputProps }}
        />
      )
    }

    const getItem = (itemProps) => <GeocoderItem {...itemProps}/>

    return (
      <GeocoderGL
        ref={geoRef => this.geoRef = geoRef}
        viewport={{ true: 0 }} //this is just filler to stop errors
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        inputComponent={input}
        itemComponent={getItem}
        updateInputOnSelect
        onSelected={this.selectItem}
        timeout={150}
      />
    )
  }
}

export default Geocoder