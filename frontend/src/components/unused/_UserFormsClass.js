import React from 'react'
import styled from 'styled-components'

import { loginUser, registerUser } from '../../lib/api'

import InputText from '../elements/InputText'
import Button from '../elements/Button'

const Wrapper = styled.form`
  position: absolute;
  top: ${props => props.visible ? 'calc(3rem + 5px)' : '-12rem'};
  right: 5px;
  width: 20rem;
  padding: 5px;
  z-index: 8;
  border-radius: 3px;
  
  background-color: #fffa;
  backdrop-filter: blur(4px);
  transition: top 0.4s;

  > * {
    margin-bottom: 5px;
  }
`

const ChangeMode = styled.button`
  display: block;
  font-size: 0.7rem;
  margin: auto;
  border: none;
  font-family: 'Open Sans', sans-serif;
  color: ${props => props.theme.text};
  background-color: transparent;
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
      // TODO default should be in the backend
      profile_image: 'http://res.cloudinary.com/dmhj1vjdf/image/upload/v1603961535/volunteers/u4zukx1dlvly1pu2zz81.png'
    },
    registerErrors: {}
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.visible !== this.props.visible) this.setState({ mode: 'login' })
  }
  
  switchMode = event => {
    event.preventDefault()
    const mode = this.state.mode === 'login' ? 'register' : 'login'
    this.setState({ mode, registerErrors: {} })
  }

  handleChange = ({ target: { name, value } }) => {
    const formData = {
      ...this.state.formData,
      [name]: value
    }
    const registerErrors = {
      ...this.state.registerErrors,
      [name]: ''
    }
    this.setState({ formData, registerErrors })
  }

  handleSubmit = async event => {
    event.preventDefault()

    const { mode, formData } = this.state
    const { app, onLogin } = this.props

    if (mode === 'register') {
      try {
        const response = await registerUser(formData)
        if (response.status !== 201) return
      } catch (err) {
        this.setState({ registerErrors: err.response.data })
        return
      }
    }
    try {
      const loginData = {
        email: formData.email,
        password: formData.password
      }
      const { data, status } = await loginUser(loginData)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user_id', data.id)
      if (status === 200) {
        onLogin()
        app.showNotification(data.message)
      }
    } catch (err) {
      app.showNotification(err.response.data.detail)
      this.setState({ formData: { ...formData, email: '', password: '' } })
    }
  }

  render() {
    const { mode, registerErrors: err } = this.state
    const { username, email, password, password_confirmation: passConf, first_name: firstName, last_name: lastName, phone } = this.state.formData
    const register = mode === 'register'
    return (
      <Wrapper visible={this.props.visible} onSubmit={this.handleSubmit}>
        {register && <>
          <InputText label="username" name="username" value={username} returnValue={this.handleChange} error={err.username} />
          <InputText label="first name" name="first_name" value={firstName} returnValue={this.handleChange} error={err.first_name} />
          <InputText label="last name" name="last_name" value={lastName} returnValue={this.handleChange} error={err.last_name} />
        </>}
        <InputText label="email" name="email" value={email} returnValue={this.handleChange} error={err.email} />
        {/* TODO Remove phone number from model? */}
        {register &&
          <InputText label="phone" name="phone" value={phone} type="number" returnValue={this.handleChange} error={err.phone} />}
        <InputText label="password" name="password" value={password} type="password" returnValue={this.handleChange} error={err.password} />
        {register &&
          <InputText label="confirm password" name="password_confirmation" value={passConf} type="password" returnValue={this.handleChange} error={err.password_confirmation} />}
        <Button primary={true} width={'100%'}>{mode}</Button>
        <ChangeMode onClick={this.switchMode}>{register ? ' I have an account' : 'new user'}</ChangeMode>
      </Wrapper>
    )
  }
}

export default UserForms