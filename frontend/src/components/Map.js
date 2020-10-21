import React from 'react'
import MapGL from '@urbica/react-map-gl'

class Map extends React.Component {

  render() {
    return (
      <MapGL
        ref={map => this.mapRef = map}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        width="100%" height="100%"
        getCursor={() => 'arrow'}
      />
    )
  }
}

export default Map