import React from 'react'
import MapGL from '@urbica/react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import Pin from './Pin'
import MapHelper from './MapHelper'
import MapLoading from './MapLoading'

const Map = ({ setRef, pins, clickPin, flyTo }) => {
  const [viewport, setViewport] = React.useState({ zoom: 1, latitude: 50, longitude: 0 })
  const [mapReady, setMapReady] = React.useState(false)
  // MapGL will only render child components once the tiles have loaded so
  // we can use this to check when to stop displaying the loading screen
  const onMapLoad = () => setMapReady(true)

  React.useEffect(() => {
    if (!flyTo) return
    const { latitude, longitude, zoom } = flyTo
    setViewport({ latitude, longitude, zoom: zoom + 10 })
  }, [flyTo])

  return (
    <>
      {!mapReady && <MapLoading/>}
      <MapGL
        ref={setRef}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        style={{ width: '100%', height: mapReady ? '100%' : 0 }}
        cursorStyle="default"
        accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        {...viewport}
        viewportChangeMethod="flyTo"
        onViewportChange={setViewport}
        doubleClickZoom={false}
      >
        <MapHelper onMount={onMapLoad} />
        {pins && pins.map((pin, i) => (
          <Pin key={i} {...pin} clickPin={clickPin} dblClickPin={setViewport} />
        ))}
      </MapGL>
    </>
  )
}

export default Map