import React from 'react'
import styled from 'styled-components'

import { loginUser } from '../../lib/api'

import InputText from './InputText'
import Button from './Button'

const Wrapper = styled.form`
  position: absolute;
  z-index: 9;
  top: 3.1rem;
  background-color: papayawhip;
  width: 300px;
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
  }

  render() {
    const { email, password } = this.state.formData
    return (
      <Wrapper onSubmit={this.handleSubmit}>
        <InputText label="email" name="email" value={email} returnValue={this.handleChange}/>
        <InputText label="password" name="password" value={password} type="password" returnValue={this.handleChange}/>
        <Button label="login" width="calc(100% - 10px)" />
      </Wrapper>
    )
  }
}

export default UserForms