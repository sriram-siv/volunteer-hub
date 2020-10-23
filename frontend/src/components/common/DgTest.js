import React from 'react'

import InputText from '../elements/InputText'
import Button from '../elements/Button'
import { registerUser } from '../../lib/api'

// TEST REGISTRATION FORM

class DgTest extends React.Component {
  state = {
    formData: {
      firstName: null,
      lastName: null,
      userName: null,
      email: null,
      phone: null,
      password: null,
      confirmPassword: null
    }
  }

  handleChange = (e) => {
    const formData = {
      ...this.state.formData,
      [e.name]: e.value
    }
    this.setState({ formData })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    console.log(this.state.formData)
    try {
      const response = await registerUser(this.state.formData)
      console.log(response.data.message)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: 'papayawhip', width: '200px' }}>
        <form>
          <InputText label='First Name' name='firstName' returnValue={this.handleChange}/>
          <InputText label='Last Name' name='lastName' returnValue={this.handleChange}/>
          <InputText label='Username' name='userName' returnValue={this.handleChange}/>
          <InputText label='Email' name='email' returnValue={this.handleChange}/>
          <InputText label='Phone' name='phone' returnValue={this.handleChange}/>
          <InputText label='Password' name='password' returnValue={this.handleChange}/>
          <InputText label='Confirm Password' name='confirmPassword' returnValue={this.handleChange}/>
          <Button width='100%' label='submit' onClick={this.handleSubmit}/>
        </form>
      </div>
    )
  }
}

export default DgTest