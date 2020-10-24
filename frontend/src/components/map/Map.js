import React from 'react'
import MapGL from '@urbica/react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import Pin from './Pin'
import MapHelper from './MapHelper'

class Map extends React.Component {

  state = {
    viewport: {
      zoom: 1,
      latitude: 0,
      longitude: 0
    },
    bounds: null,
    mapReady: false
  }

  setViewport = newViewport => {
    const viewport = { ...this.state.viewport, ...newViewport }
    const bounds = this.mapRef ? { ...this.mapRef.getMap().getBounds() } : null
    this.setState({ viewport, bounds })
  }

  setMapRef = map => {
    this.mapRef = map
    // map.getMap().on('idle', console.log('load map'))
  }

  onMapLoad = () => {
    this.setState({ mapReady: true })
  }

  render() {
    const { pins } = this.props
    const  { mapReady } = this.state
    return (
      <>
        {!mapReady && <div style={{ textAlign: 'center', lineHeight: '100vh' }}>Map Loading</div>}
        <MapGL
          ref={this.setMapRef}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          style={{ width: '100%', height: mapReady ? '100%' : 0 }}
          cursorStyle="default"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          {...this.state.viewport}
          viewportChangeMethod="flyTo"
          onViewportChange={this.setViewport}
        >
          <MapHelper onMount={this.onMapLoad}/>
          {pins.map((pin, i) => <Pin key={i} {...pin} number={i + 1} clickPin={this.setViewport} />)}
        </MapGL>
      </>
    )
  }
}

export default Map