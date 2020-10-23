import React from 'react'
import styled from 'styled-components'


const Item = styled.div`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 10px;
   &:hover {
     background-color: ${props => props.theme.primary};
     color: #333;
   }
`

class GeocoderItem extends React.Component {

  state = {
    isHover: false
  }

  mouseEnter = () => {
    this.setState({ isHover: true })
  }
  mouseLeave = () => {
    this.setState({ isHover: false })
  }

  render() {
    return <Item {...this.props} isHover={this.state.isHover} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} />
  }
}

export default GeocoderItem