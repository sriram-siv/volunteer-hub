import React from 'react'

import InputText from '../elements/InputText'
import Button from '../elements/Button'

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

  render() {
    return (
      <div style={{ backgroundColor: 'papayawhip' }}>
        <div style={{ height: '20px' }}/>
        <InputText width="500px" label="location"/>
        <div style={{ height: '10px' }}/>
        <InputText width="500px" label="tags"/>
        <div style={{ height: '10px' }} />
        <Button />
      </div>
    )
  }
}

export default Tests