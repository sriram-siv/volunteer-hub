import React from 'react'
import styled from 'styled-components'
import MapGL from '@urbica/react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import Pin from './Pin'

const LoadingScreen = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  line-height: calc(100vh - 3rem);
  text-align: center;
  z-index: 1;
  background-color: white;
  opacity: ${props => props.mapLoading ? 1 : 0};
  transition: opacity 0.3s;
`

const Map = ({ pins, clickPin, flyTo, setRef }) => {

  const [mapLoading, setMapLoading] = React.useState(true)
  const [viewport, setViewport] = React.useState({ zoom: 1, latitude: 50, longitude: 0 })

  React.useEffect(() => {
    if (!flyTo) return
    const { latitude, longitude, zoom } = flyTo
    setViewport({ latitude, longitude, zoom: zoom + 10 })
  }, [flyTo])

  const style = {
    position: 'relative',
    top: '-1px',
    left: '-1px',
    width: 'calc(100% + 2px)',
    height: 'calc(100% + 2px)'
  }

  return (
    <>
      <LoadingScreen mapLoading={mapLoading}>Loading Map..</LoadingScreen>
      <MapGL
        ref={setRef}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        style={style}
        cursorStyle="default"
        accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        {...viewport}
        viewportChangeMethod="flyTo"
        onViewportChange={setViewport}
        doubleClickZoom={false}
        onLoad={() => setMapLoading(false)}
      >
        {pins && pins.map((pin, i) => (
          <Pin key={i} {...pin} clickPin={clickPin} dblClickPin={setViewport} />
        ))}
      </MapGL>
    </>
  )
}

export default Map