import React from 'react'

import InputText from '../elements/InputText'
import Button from '../elements/Button'
import Geocoder from '../elements/Geocoder'

class Tests extends React.Component {

  dark = {
    primary: '#fef715',
    shadow: '#ced4da',
    background: '#444',
    text: '#bbb'
  }
  
  light = {
    primary: '#fef715',
    shadow: '#aeb4ba',
    background: 'white',
    text: '#333'
  }

  getResults = () => {
    console.log(this.geocoder.geoRef.state.inputValue)
  }

  render() {
    return (
      <div style={{ backgroundColor: 'papayawhip' }}>
        <div style={{ height: '20px' }}/>
        <InputText width="500px" label="location"/>
        <div style={{ height: '10px' }}/>
        <InputText width="500px" label="tags"/>
        <div style={{ height: '10px' }} />
        <Button width="300px" label="search" onClick={this.getResults}/>
        <div style={{ height: '10px' }} />
        <div style={{ width: '500px', margin: 'auto' }}>
          <Geocoder ref={geocoder => this.geocoder = geocoder} />
        </div>
      </div>
    )
  }
}

export default Tests