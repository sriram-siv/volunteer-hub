import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { getSingleProfile } from './lib/api'

import NavBar from './components/common/NavBar'
import Notification from './components/common/Notification'

import Home from './components/common/Home'
import Room from './components/common/Room'
import CampaignIndex from './components/common/CampaignIndex'
import CampaignShow from './components/common/CampaignShow'
import CampaignCreate from './components/common/CampaignCreate'

import Tests from './components/common/Tests'
import Profile from './components/common/Profile'

class App extends React.Component {

  state = {
    theme: 'light',
    userData: null,
    userCampaigns: null,
    notification: {}
  }

  themes = {
    dark: {
      name: 'dark',
      primary: '#ffff50',
      shadow: '#aeb4ba',
      background: '#222',
      text: '#ccc',
      fontWeight: 300,
      letterSpacing: '-0.002rem',
      accent: '#999',
      panels: '#131d25'
    },
    light: {
      name: 'light',
      primary: '#ffff50',
      shadow: '#aeb4ba',
      background: '#fff',
      text: '#333',
      fontWeight: 400,
      letterSpacing: 0,
      accent: '#eee',
      panels: 'papayawhip'
    }
  }

  componentDidMount = () => {
    const userID = localStorage.getItem('user_id')
    if (userID) this.getUser(userID)
  }

  changeTheme = () => {
    const theme = this.state.theme === 'light' ? 'dark' : 'light'
    this.setState({ theme })
  }

  getUser = async (id) => {
    const response = await getSingleProfile(id)
    console.log(response.data, id)
    this.setState({ userData: response.data }, this.getUserCampaigns)
    this.showNotification(`welcome back ${response.data.username}`)
  }

  logout = () => {
    localStorage.removeItem('user_id')
    this.setState({ userData: null, userCampaigns: null })
    this.showNotification('you are now logged out')
  }

  getUserCampaigns = () => {
    if (!this.state.userData) return
    const ownedCampaigns = this.state.userData.owned_campaigns.map(campaign => ({ value: `/campaigns/${campaign.id}`, label: campaign.name }))
    const coordCampaigns = this.state.userData.coord_campaigns.map(campaign => ({ value: `/campaigns/${campaign.id}`, label: campaign.name }))
    const confCampaigns = this.state.userData.conf_campaigns.map(campaign => ({ value: `/campaigns/${campaign.id}`, label: campaign.name }))
    this.setState({ userCampaigns: [...ownedCampaigns, ...coordCampaigns, ...confCampaigns] }, () => console.log(this.state.userCampaigns))  
  }

  /* auto options: 0 autohide, 1 wait to dismiss */
  showNotification = (message, auto = 0) => {
    this.setState({ notification: { message, auto } })
  }

  app = {
    getUser: this.getUser,
    logout: this.logout,
    showNotification: this.showNotification
  }

  render() {
    const { theme, userCampaigns, notification } = this.state

    return (
      <ThemeProvider theme={this.themes[theme]}>
        <BrowserRouter>
          <Notification notification={notification}/>
          <NavBar ref={ref => this.app.navbar = ref} changeTheme={this.changeTheme} app={this.app} campaignList={userCampaigns}/>
          <Switch>
            <Route path='/tests' component={Tests} />
            <Route exact path="/" component={Home} />
            <Route path="/profile" render={() => <Profile app={this.app} />} />
            <Route path="/chat/:room" component={Room} />
            <Route path='/campaigns/new' component={CampaignCreate} />
            <Route path='/campaigns/:id' component={CampaignShow} />
            <Route path='/campaigns' render={() => <CampaignIndex app={this.app}/>} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App