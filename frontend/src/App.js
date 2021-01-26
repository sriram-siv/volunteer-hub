import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
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

  const [theme, setTheme] = useState('light')
  const [notification, setNotification] = useState({})

  const changeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  // TODO verify token -> set navbar to show logged in / out

  const logout = () => {
    localStorage.removeItem('user_id')
    localStorage.removeItem('token')
    showNotification('you are now logged out')
    // TODO push browser location here ?
  }

  const showNotification = (message, autoDismiss = true) => {
    setNotification({ message, autoDismiss })
  }

  const currentUser = () => Number(localStorage.getItem('user_id'))

  const app = {
    logout,
    showNotification,
    currentUser,
    changeTheme
  }

  const { pathname } = window.location
  
  return (
    <AppContext.Provider value={app}>
      <ThemeProvider theme={styles.themes[theme]}>
        <BrowserRouter>
          <Notification notification={notification}/>
          {pathname !== '/' && <NavBar changeTheme={changeTheme} />}
          <Switch>
            <Route exact path="/" component={Home} />
            {/* TODO make profile funtional and use context */}
            <Route path="/profile" render={() => <Profile app={app} />} />
            <Route path="/chat/:room" component={Room} />
            <Route path='/campaigns/new' component={CampaignForm} />
            <Route path='/campaigns/:id/edit' component={CampaignForm} />
            <Route path='/campaigns/:id' component={CampaignShow} />
            {/* TODO make index funtional and use context */}
            <Route path='/campaigns' render={() => <CampaignIndex app={app} />} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  )
}

export default App