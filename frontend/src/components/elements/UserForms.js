import React from 'react'
import styled from 'styled-components'

import { loginUser, registerUser } from '../../lib/api'

import InputText from './InputText'
import Button from './Button'

const Wrapper = styled.form`
  position: absolute;
  z-index: 9;
  top: ${props => props.visible ? 'calc(3rem + 5px)' : '-12rem'};
  left: 5px;
  background-color: ${props => props.theme.panels};
  border-width: 1px;
  /* border-style: solid; */
  border-color: ${props => props.theme.shadow};
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
      profile_image: undefined
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.visible !== this.props.visible) this.setState({ mode: 'login' })
  }
  
  switchMode = () => {
    const mode = this.state.mode === 'login' ? 'register' : 'login'
    this.setState({ mode })
  }

  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.name]: event.target.value
    }
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const loginData = {
      email: this.state.formData.email,
      password: this.state.formData.password
    }

    console.log(this.state.formData)
    
    if (this.state.mode === 'register') {
      const response = await registerUser(this.state.formData)

      if (response.status !== 201) return
    }

    const response = await loginUser(loginData)

    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user_id', response.data.id)
    if (response.status === 200) this.props.onLogin(response.data.id)
    console.log(localStorage.getItem('user_id'))
  }

  render() {
    const { mode } = this.state
    const { username, email, password, password_confirmation, first_name, last_name, phone } = this.state.formData
    return (
      <Wrapper visible={this.props.visible} onSubmit={this.handleSubmit}>
        {mode === 'register' && <InputText label="username" name="username" value={username} returnValue={this.handleChange} />}
        {mode === 'register' && <InputText label="first name" name="first_name" value={first_name} returnValue={this.handleChange} />}
        {mode === 'register' && <InputText label="last name" name="last_name" value={last_name} returnValue={this.handleChange} />}
        <InputText label="email" name="email" value={email} returnValue={this.handleChange}/>
        {mode === 'register' && <InputText label="phone" name="phone" value={phone} returnValue={this.handleChange} />}
        <InputText label="password" name="password" value={password} type="password" returnValue={this.handleChange}/>
        {mode === 'register' && <InputText label="confirm password" name="password_confirmation" value={password_confirmation} type="password" returnValue={this.handleChange} />}
        <Button label={mode} width="calc(100% - 10px)" />
        <ChangeMode onClick={this.switchMode}>{mode === 'login' ? 'new user' : ' I have an account'}</ChangeMode>
      </Wrapper>
    )
  }
}

export default UserForms