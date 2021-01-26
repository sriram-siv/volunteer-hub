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

  const changeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  // TODO - onMount
  // Check age of token
  // if 1+ days -> show welcome message and refresh token
  // else refresh token, no message

  // if expired -> remove token / id from localstorage 

  const logout = () => {
    localStorage.removeItem('user_id')
    localStorage.removeItem('token')
    showNotification('you are now logged out')
    history.push('/campaigns')
  }

  const showNotification = (message, autoDismiss = true) => {
    setNotification({ message, autoDismiss })
  }

  const currentUser = () => Number(localStorage.getItem('user_id'))

  const context = {
    logout,
    showNotification,
    currentUser,
    changeTheme
  }
  
  return (
    <AppContext.Provider value={context}>
      <ThemeProvider theme={styles.themes[theme]}>

        <NavBar changeTheme={changeTheme} />
        <Notification notification={notification}/>

        <Switch>
          <Route exact path="/" component={Home} />
          {/* TODO make profile funtional and use context */}
          <Route path="/profile" render={() => <Profile app={context} />} />
          <Route path="/chat/:room" component={Room} />
          <Route path='/campaigns/new' component={CampaignForm} />
          <Route path='/campaigns/:id/edit' component={CampaignForm} />
          <Route path='/campaigns/:id' component={CampaignShow} />
          <Route path='/campaigns' component={CampaignIndex} />
        </Switch>

      </ThemeProvider>
    </AppContext.Provider>
  )
}

export default App