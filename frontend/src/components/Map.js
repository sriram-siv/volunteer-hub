import React from 'react'
import MapGL from '@urbica/react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

class Map extends React.Component {

  state = {
    viewport: {
      zoom: 1,
      latitude: 0,
      longitude: 0
    },
    bounds: null
  }

  setViewport = newViewport => {
    const viewport = { ...this.state.viewport, ...newViewport }
    const bounds = this.mapRef ? { ...this.mapRef.getMap().getBounds() } : null
    this.setState({ viewport, bounds })
  }

  render() {
    return (
      <MapGL
        ref={map => this.mapRef = map}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        style={{ width: '100%', height: '400px' }}
        cursorStyle="default"
        accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        {...this.state.viewport}
        onViewportChange={this.setViewport}
      />
    )
  }
}

export default Map