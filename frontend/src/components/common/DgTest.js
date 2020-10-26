import React from 'react'

import InputText from '../elements/InputText'
import Button from '../elements/Button'
import { registerUser } from '../../lib/api'

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
      password_confirmation: null,
      profile_image: null
    }
  }

  handleChange = (e) => {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
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

  showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      { 
        cloudName: 'dmhj1vjdf',
        uploadPreset: 'jisx4gi0',
        showUploadMoreButton: false
      },
      (error, result) => {
        if (!error && result && result.event === 'success') { 
          const formData = { ...this.state.formData, profile_image: result.info.url }
          this.setState({ formData })
        }
      })
    widget.open()
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
          <div onClick={this.showWidget}>Upload an Image</div>
          <Button width='100%' label='submit' onClick={this.handleSubmit}/>
        </form>
      </div>
    )
  }
}

export default DgTest