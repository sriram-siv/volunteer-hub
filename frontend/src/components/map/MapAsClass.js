import React from 'react'
import MapGL from '@urbica/react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import Pin from './Pin'
import MapHelper from './MapHelper'

class Map extends React.Component {

  state = {
    viewport: {
      zoom: 1,
      latitude: 50,
      longitude: 0
    },
    bounds: null,
    mapReady: false
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.flyTo !== this.props.flyTo) {
      const { latitude, longitude } = this.props.flyTo
      const zoom = this.props.flyTo.zoom + 10
      this.setViewport({ latitude, longitude, zoom })
    }
  }

  setViewport = newViewport => {
    const viewport = { ...this.state.viewport, ...newViewport }
    this.setState({ viewport })
  }

  onMapLoad = () => {
    if (!this.state.mapReady) this.setState({ mapReady: true })
  }

  render() {
    const { pins, setRef, clickPin } = this.props
    const { mapReady } = this.state
    return (
      <>
        {!mapReady && <div style={{ textAlign: 'center', lineHeight: '100vh' }}>Map Loading</div>}
        <MapGL
          ref={setRef}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          style={{ width: '100%', height: mapReady ? '100%' : 0 }}
          cursorStyle="default"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          {...this.state.viewport}
          viewportChangeMethod="flyTo"
          onViewportChange={this.setViewport}
          doubleClickZoom={false}
        >
          <MapHelper onMount={this.onMapLoad} />
          {pins && pins.map((pin, i) => (
            <Pin key={i} {...pin} clickPin={clickPin} dblClickPin={this.setViewport} />
          ))}
        </MapGL>
      </>
    )
  }
}

export default Map