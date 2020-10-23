import React from 'react'

import InputText from '../elements/InputText'
import Button from '../elements/Button'

// TEST REGISTRATION FORM

class DgTest extends React.Component {
  state = {
    formData: {
      firstName: null,
      lastName: null,
      email: null,
      phone: null
    }
  }

  handleChange = (e) => {
    const formData = {
      ...this.state.formData,
      [e.name]: e.value
    }
    this.setState({ formData })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // just add in api route to register
    console.log(this.state.formData)
  }

  render() {
    return (
      <div style={{ backgroundColor: 'papayawhip', width: '200px' }}>
        <form>
          <InputText label='First Name' name='firstName' returnValue={this.handleChange}/>
          <InputText label='Last Name' name='lastName' returnValue={this.handleChange}/>
          <InputText label='Email' name='email' returnValue={this.handleChange}/>
          <InputText label='Phone' name='phone' returnValue={this.handleChange}/>
          <Button width='100%' label='submit' onClick={this.handleSubmit}/>
        </form>
      </div>
    )
  }
}

export default DgTest