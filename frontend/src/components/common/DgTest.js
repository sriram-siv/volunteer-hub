import React from 'react'

import InputText from '../elements/InputText'
import Button from '../elements/Button'
import { getAllCampaigns, registerUser } from '../../lib/api'

// TEST REGISTRATION FORM

class DgTest extends React.Component {
  state = {
    formData: {
      first_name: null,
      last_name: null,
      username: null,
      email: null,
      phone: null,
      password: null,
      password_confirmation: null
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
    try {
      const response = await registerUser(this.state.formData)
      console.log(response)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: 'papayawhip', width: '200px' }}>
        <form>
          <InputText label='First Name' name='first_name' returnValue={this.handleChange}/>
          <InputText label='Last Name' name='last_name' returnValue={this.handleChange}/>
          <InputText label='Username' name='username' returnValue={this.handleChange}/>
          <InputText label='Email' name='email' returnValue={this.handleChange}/>
          <InputText label='Phone' name='phone' returnValue={this.handleChange}/>
          <InputText label='Password' name='password' returnValue={this.handleChange}/>
          <InputText label='Confirm Password' name='password_confirmation' returnValue={this.handleChange}/>
          <Button width='100%' label='submit' onClick={this.handleSubmit}/>
        </form>
      </div>
    )
  }
}

export default DgTest