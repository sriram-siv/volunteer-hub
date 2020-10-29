import React from 'react'
import styled from 'styled-components'
import { Marker } from '@urbica/react-map-gl'


class Pin extends React.Component {

  state = {
    alt: false
  }
  
  Wrapper = styled.div`
    position: relative;
    width: ${() => `${this.props.size}px`};
    height: ${() => `${this.props.size}px`};
    cursor: pointer;
    top: ${() => `-${this.props.size - 2}px`};
  `
  Base = styled.div`
    width: 100%;
    height: 100%;
    clip-path: circle();
    background-color: ${() => this.props.color};
  `
  Point = styled.div`
    background-color: ${() => this.props.color};
    clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
    position: absolute;
    top: 70%;
    left: 5%;
    width: 90%;
    height: 65%;
  `
  Inner = styled.div`
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    clip-path: circle();
    background-color: ${() => this.state.alt && this.props.number > 0 ? this.props.color : '#f8f6f3'};
  `
  Dot = styled.div`
    position: absolute;
    top: 12.5%;
    left: 12.5%;
    width: 75%;
    height: 75%;
    background-color: ${() => this.props.color};
    clip-path: circle();
  `
  Label = styled.div`
    width: 100%;
    background-color: transparent;
    color: ${() => this.state.alt ? 'white' : '#333'};
    font-size: ${() => `${this.props.size * 0.6}px`};
    line-height: ${() => `${this.props.size * 0.8}px`};
    font-family: 'Ubuntu Mono', monospace;
    text-align: center;
    font-weight: ${() => this.state.alt ? 400 : 700};
  `

  componentDidMount = () => {
    this.setState({ alt: this.props.alt })
  }

  hoverPin = () => {
    this.setState({ alt: !this.state.alt })
  }

  // Will need to move latlng to state if dragging allowed
  dragPin = event => {
    const latitude = event.lngLat[1]
    const longitude = event.lngLat[0]
    this.setState({ latitude, longitude })
  }

  render() {

    const { latitude, longitude, number, id } = this.props
    const { Wrapper, Base, Point, Inner, Dot, Label } = this
    if (!latitude) return null

    const zoomToPin = () => {
      this.props.dblClickPin({ latitude, longitude, zoom: 15 })
    }
    const openDetails = () => {
      this.props.clickPin(id)
    }
    
    return (
      <Marker
        latitude={latitude}
        longitude={longitude}
        // draggable={draggable}
        onClick={openDetails}
        // onDrag={() => console.log('draggin pin..')}
      >
        <Wrapper onDoubleClick={zoomToPin} onMouseEnter={this.hoverPin} onMouseLeave={this.hoverPin}>
          <Base/>
          <Point/>
          <Inner>
            {number > 0 ? <Label>{number}</Label> : <Dot/>}
          </Inner>
        </Wrapper>
      </Marker>
    )
  }
}

export default Pin