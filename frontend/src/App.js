import React, { useEffect, useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import styles from './lib/styles'
import { checkToken } from './lib/api'

import NavBar from './components/common/NavBar'
import Notification from './components/common/Notification'

import Home from './components/common/Home'
import Room from './components/common/Room'
import CampaignIndex from './components/common/CampaignIndex'
import CampaignShow from './components/common/CampaignShow'
import CampaignForm from './components/common/CampaignForm'
import Profile from './components/common/Profile'

export const AppContext = React.createContext()

const App = () => {

  const history = useHistory()

  const [theme, setTheme] = useState('light')
  const [notification, setNotification] = useState({})
  const [user, setUser] = useState(null)

  const refreshToken = () => {
    
    if (!localStorage.getItem('token')) return

    checkToken().then(
      ({ data }) => {
        setUser(data.user)
        localStorage.setItem('token', data.token)
      },
      ({ response }) => {
        if (response.status === 403) {
          localStorage.removeItem('token')
        }
      }
    )
  }

  useEffect(refreshToken, [])

  const methods = {

    setNotification,

    changeTheme: () => setTheme(theme === 'light' ? 'dark' : 'light'),

    userID: () => +localStorage.getItem('id'),
    user,

    login: (data) => {
      setNotification({ message: data.message })
      localStorage.setItem('token', data.token)
      localStorage.setItem('id', data.id)
      setUser(data.id)
    },

    logout: () => {
      localStorage.clear()
      history.push('/campaigns')
      setUser(null)
      setNotification({ message: 'Logged out successfully. Goodbye' })
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.warn('running in development')
  }

  return (
    <AppContext.Provider value={methods}>
      <ThemeProvider theme={styles.themes[theme]}>

        <NavBar/>
        <Notification notification={notification}/>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/chat/:room" component={Room} />
          <Route path='/campaigns/new' component={CampaignForm} />
          <Route path='/campaigns/:id/edit' component={CampaignForm} />
          <Route path='/campaigns/:id/:section?' component={CampaignShow} />
          <Route path='/campaigns' component={CampaignIndex} />
        </Switch>

      </ThemeProvider>
    </AppContext.Provider>
  )
}

export default App