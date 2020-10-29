import React from 'react'

// This component calls the onMount method in the map once it has fully 
// loaded the tiles so we know when to stop displaying the loading screen
class MapHelper extends React.Component {
  componentDidMount = () => this.props.onMount()
  render = () => null
}

export default MapHelper