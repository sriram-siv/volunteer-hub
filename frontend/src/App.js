import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { getSingleProfile } from './lib/api'

import NavBar from './components/common/NavBar'
import Home from './components/common/Home'
import Room from './components/common/Room'
import CampaignIndex from './components/common/CampaignIndex'
import CampaignShow from './components/common/CampaignShow'
import CampaignCreate from './components/common/CampaignCreate'

import Tests from './components/common/Tests'
import DgTest from './components/common/DgTest'
import Profile from './components/common/Profile'

class App extends React.Component {

  state = {
    theme: 'light',
    userData: null,
    userCampaigns: null
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

  notify = content => console.log(content)

  getUser = async (id) => {
    const response = await getSingleProfile(id)
    console.log(response.data, id)
    this.setState({ userData: response.data }, this.getUserCampaigns)
  }

  logout = () => {
    localStorage.removeItem('user_id')
    this.setState({ userData: null, userCampaigns: null })
    console.log('logged out')
  }

  getUserCampaigns = () => {
    if (!this.state.userData) return
    const ownedCampaigns = this.state.userData.owned_campaigns.map(campaign => ({ value: `/campaigns/${campaign.id}`, label: campaign.name }))
    const coordCampaigns = this.state.userData.coord_campaigns.map(campaign => ({ value: `/campaigns/${campaign.id}`, label: campaign.name }))
    const confCampaigns = this.state.userData.conf_campaigns.map(campaign => ({ value: `/campaigns/${campaign.id}`, label: campaign.name }))
    this.setState({ userCampaigns: [...ownedCampaigns, ...coordCampaigns, ...confCampaigns] }, () => console.log(this.state.userCampaigns))  
  }

  app = {
    getUser: this.getUser,
    logout: this.logout
  }

  render() {
    const { theme, userCampaigns } = this.state
    // TODO if unauthorized redirect to landing page
    return (
      <ThemeProvider theme={this.themes[theme]}>
        <BrowserRouter>
          <NavBar changeTheme={this.changeTheme} app={this.app} campaignList={userCampaigns}/>
          <Switch>
            <Route path='/tests' component={Tests} />
            <Route path='/dgtests' component={DgTest} />
            <Route exact path="/" component={Home} />
            <Route path="/profile" render={() => <Profile app={this.app}/>} />
            <Route path="/chat/:room" component={Room} />
            <Route path='/campaigns/new' component={CampaignCreate} />
            <Route path='/campaigns/:id' component={CampaignShow} />
            <Route path='/campaigns' component={CampaignIndex} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App