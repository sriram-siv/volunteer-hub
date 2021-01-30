import React, { useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import styles from './lib/styles'

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
  
  // TODO BACKEND - onMount
  // Check age of token
  // if 1+ days -> show welcome message and refresh token
  // else refresh token, no message

  // if expired -> remove token / id from localstorage 

  // this way userID could be kept in state instead of storage ?

  const methods = {

    setNotification,

    changeTheme: () => setTheme(theme === 'light' ? 'dark' : 'light'),

    userID: () => +localStorage.getItem('id'),

    login: (data) => {
      setNotification({ message: data.message })
      localStorage.setItem('token', data.token)
      localStorage.setItem('id', data.id)
    },

    logout: () => {
      localStorage.clear()
      history.push('/campaigns')
      setNotification({ message: 'Logged out successfully. Goodbye' })
    } 
  }

  return (
    <AppContext.Provider value={methods}>
      <ThemeProvider theme={styles.themes[theme]}>

        <NavBar/>
        <Notification notification={notification}/>

        <Switch>
          <Route exact path="/" component={Home} />
          {/* TODO make profile funtional and use context */}
          <Route path="/profile" render={() => <Profile app={methods} />} />
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