import React from 'react'
import styled from 'styled-components'

import { loginUser } from '../../lib/api'

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

class UserForms extends React.Component {

  state = {
    formData: {
      email: '',
      password: ''
    }
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
    const response = await loginUser(this.state.formData)
    console.log(response)

    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user_id', response.data.id)
    if (response.status === 200) this.props.onLogin()
  }

  render() {
    const { email, password } = this.state.formData
    return (
      <Wrapper visible={this.props.visible} onSubmit={this.handleSubmit}>
        <InputText label="email" name="email" value={email} returnValue={this.handleChange}/>
        <InputText label="password" name="password" value={password} type="password" returnValue={this.handleChange}/>
        <Button label="login" width="calc(100% - 10px)" />
      </Wrapper>
    )
  }
}

export default UserForms