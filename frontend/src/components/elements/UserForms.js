import React from 'react'
import styled from 'styled-components'

import { loginUser, registerUser } from '../../lib/api'

import InputText from './InputText'
import Button from './Button'

const Wrapper = styled.form`
  position: absolute;
  z-index: 8;
  top: ${props => props.visible ? 'calc(3rem + 5px)' : '-12rem'};
  left: 5px;
  background-color: ${props => props.theme.panels};
  width: 360px;
  transition: top 0.4s;
  > * {
    margin: 5px;
  }
`

const ChangeMode = styled.p`
  font-size: 0.7rem;
  text-align: center;
  color: ${props => props.theme.text};
  cursor: pointer;
`

class UserForms extends React.Component {

  state = {
    mode: 'login',
    formData: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      profile_image: 'http://res.cloudinary.com/dmhj1vjdf/image/upload/v1603961535/volunteers/u4zukx1dlvly1pu2zz81.png'
    },
    showNotification: false,
    registerErrors: {}
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.visible !== this.props.visible) this.setState({ mode: 'login' })
  }
  
  switchMode = () => {
    const mode = this.state.mode === 'login' ? 'register' : 'login'
    this.setState({ mode, registerErrors: {} })
  }

  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.name]: event.target.value
    }
    const registerErrors = {
      ...this.state.registerErrors,
      [event.target.name]: ''
    }
    this.setState({ formData, registerErrors })
  }

  handleSubmit = async event => {
    event.preventDefault()

    // Prepare separate form for login so that autologin can complete upon register
    const loginData = {
      email: this.state.formData.email,
      password: this.state.formData.password
    }
    
    if (this.state.mode === 'register') {
      try {
        const response = await registerUser(this.state.formData)
        if (response.status !== 201) return
      } catch (err) {
        console.log(err.response.data)
        this.setState({ registerErrors: err.response.data })
        return
      }
    }
    try {
      const response = await loginUser(loginData)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user_id', response.data.id)
      if (response.status === 200) this.props.onLogin(response.data.id)
    } catch (err) {
      this.props.app.showNotification(err.response.data.detail)
      const formData = { ...this.state.formData, email: '', password: '' }
      this.setState({ formData })
    }
  }

  render() {
    const { mode, registerErrors } = this.state
    const { username, email, password, password_confirmation: passwordConfirmation, first_name: firstName, last_name: lastName, phone } = this.state.formData
    return (
      <Wrapper visible={this.props.visible} onSubmit={this.handleSubmit}>
        {mode === 'register' &&
          <InputText label="username" name="username" value={username} returnValue={this.handleChange} error={registerErrors.username} />}
        {mode === 'register' &&
          <InputText label="first name" name="first_name" value={firstName} returnValue={this.handleChange} error={registerErrors.first_name && registerErrors.first_name[0]} />}
        {mode === 'register' &&
          <InputText label="last name" name="last_name" value={lastName} returnValue={this.handleChange} error={registerErrors.last_name && registerErrors.last_name[0]} />}
        <InputText label="email" name="email" value={email} returnValue={this.handleChange} error={registerErrors.email && registerErrors.email[0]} />
        {mode === 'register' &&
          <InputText label="phone" name="phone" value={phone} type="number" returnValue={this.handleChange} error={registerErrors.phone && registerErrors.phone[0]} />}
        <InputText label="password" name="password" value={password} type="password" returnValue={this.handleChange} error={registerErrors.password && registerErrors.password[0]} />
        {mode === 'register' &&
          <InputText label="confirm password" name="password_confirmation" value={passwordConfirmation} type="password" returnValue={this.handleChange} error={registerErrors.password_confirmation && registerErrors.password_confirmation[0]} />}
        <Button label={mode} width="calc(100% - 10px)" />
        <ChangeMode onClick={this.switchMode}>{mode === 'login' ? 'new user' : ' I have an account'}</ChangeMode>
      </Wrapper>
    )
  }
}

export default UserForms