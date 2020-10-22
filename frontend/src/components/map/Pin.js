import React from 'react'
import { Marker } from '@urbica/react-map-gl'

class Pin extends React.Component {

  state = {
    latitude: 0,
    longitude: 0,
    number: 0,
    color: '#050',
    alt: false,
    draggable: false,
    size: 20
  }

  componentDidMount = () => {
    const { latitude, longitude, number, color, alt, draggable, size } = this.props
    console.log(this.props)
    this.setState({ latitude, longitude, number, color, alt, draggable, size })
  }

  hoverPin = () => {
    this.setState({ alt: !this.state.alt })
  }

  dragPin = event => {
    const latitude = event.lngLat[1]
    const longitude = event.lngLat[0]
    this.setState({ latitude, longitude })
  }

  render() {

    const { latitude, longitude, number, color, alt, draggable, size } = this.state
    if (!latitude) return null

    const container = {
      position: 'relative',
      width: `${size}px`,
      height: `${size}px`,
      cursor: 'pointer',
      top: `-${size - 2}px`
    }
    const border = {
      width: '100%',
      height: '100%',
      clipPath: 'circle()',
      backgroundColor: color
    }
    const point = {
      backgroundColor: color,
      clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
      position: 'absolute',
      top: '70%',
      left: '5%',
      width: '90%',
      height: '65%'
    }
    const inner = {
      position: 'absolute',
      top: '10%',
      left: '10%',
      width: '80%',
      height: '80%',
      clipPath: 'circle()',
      backgroundColor: alt && number > 0 ? color : '#f8f6f3'
    }
    const dot = {
      position: 'absolute',
      top: '12.5%',
      left: '12.5%',
      width: '75%',
      height: '75%',
      backgroundColor: color,
      clipPath: 'circle()'
    }
    const label = {
      width: '100%',
      backgroundColor: 'transparent',
      color: alt ? 'white' : '#333',
      // fontSize: '14px',
      fontSize: `${size * 0.6}px`,
      lineHeight: `${size * 0.8}px`,
      fontFamily: '\'Ubuntu Mono\', monospace',
      textAlign: 'center',
      fontWeight: alt ? 400 : 700
    }

    return (
      <Marker
        latitude={latitude}
        longitude={longitude}
        draggable={draggable}
        onClick={() => this.props.clickPin({ latitude, longitude, zoom: 15 })}
      >
        <div style={container}
          onMouseEnter={this.hoverPin}
          onMouseLeave={this.hoverPin}
        >
          <div style={border} />
          <div style={point} />
          <div style={inner}>
            {number > 0
              ? <div style={label}>{number}</div>
              : <div style={dot} />}
          </div>
        </div>
      </Marker>
    )
  }
}

export default Pin