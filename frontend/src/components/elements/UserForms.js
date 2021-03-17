import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

import { AppContext } from '../../App'
import { loginUser, registerUser } from '../../lib/api'

import InputText from './InputText'
import Button from './Button'

const Wrapper = styled.form`

  position: absolute;
  top: ${props => props.visible ? 'calc(3rem + 5px)' : '-12rem'};
  right: 5px;
  width: 20rem;
  max-width: calc(100vw - 10px);
  padding: 5px;
  z-index: 8;
  border-radius: 3px;
  
  background-color: #fffa;
  backdrop-filter: blur(4px);
  transition: top 0.4s;

  > * {
    margin-bottom: 5px;
  }

  @media only screen and (max-width: 425px) {
    width: calc(100vw - 10px);
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

const UserForms = ({ visible, hideForm }) => {

  const app = useContext(AppContext)

  const [mode, setMode] = useState('login')
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    // TODO default should be in the backend
    profile_image: 'http://res.cloudinary.com/dmhj1vjdf/image/upload/v1603961535/volunteers/u4zukx1dlvly1pu2zz81.png'
  })

  const [hide, setHide] = useState(true)

  useEffect(() => {
    setMode('login')
    const delay = visible ? 0 : 400
    setTimeout(() => setHide(!visible), delay)
  }, [visible])
  
  const switchMode = event => {
    event.preventDefault()
    setMode(mode === 'login' ? 'register' : 'login')
    setErrors({})
  }

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
    setErrors({
      ...errors,
      [event.target.name]: ''
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (mode === 'register') {
      try {
        const response = await registerUser(formData)
        if (response.status !== 201) return
      } catch (err) {
        setErrors(err.response.data)
        return
      }
    }

    try {
      const { data, status } = await loginUser(formData)
      if (status === 200) {
        hideForm()
        app.login(data)
      }
    } catch (err) {
      app.setNotification({ message: err.response.data.detail })
    }
  }

  const {
    username,
    email,
    password,
    password_confirmation: passConf,
    first_name: firstName,
    last_name: lastName,
    phone
  } = formData
  const register = mode === 'register'

  return (
    <Wrapper visible={visible} onSubmit={handleSubmit}>
      {!hide && <>
        {register && <>
          <InputText aria-label="Username" label="username" name="username" value={username} returnValue={handleChange} error={errors.username} />
          <InputText aria-label="First Name" label="first name" name="first_name" value={firstName} returnValue={handleChange} error={errors.first_name} />
          <InputText aria-label="Last Name" label="last name" name="last_name" value={lastName} returnValue={handleChange} error={errors.last_name} />
        </>}
        <InputText aria-label="Email" label="email" name="email" value={email} returnValue={handleChange} error={errors.email} />
        {/* TODO Remove phone number from model? */}
        {register &&
          <InputText aria-label="Phone Number" label="phone" name="phone" value={phone} type="number" returnValue={handleChange} error={errors.phone} />}
        <InputText aria-label="Password" label="password" name="password" value={password} type="password" returnValue={handleChange} error={errors.password} />
        {register &&
          <InputText aria-label="Password Confirmation" label="confirm password" name="password_confirmation" value={passConf} type="password" returnValue={handleChange} error={errors.password_confirmation} />}
        <Button primary={true} width={'100%'}>{mode}</Button>
        <ChangeMode onClick={switchMode}>{register ? ' I have an account' : 'new user'}</ChangeMode>
      </>}
    </Wrapper>
  )
}

export default UserForms