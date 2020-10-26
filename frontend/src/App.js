import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import NavBar from './components/common/NavBar'
import Home from './components/common/Home'
import Room from './components/common/Room'
import CampaignIndex from './components/common/CampaignIndex'
import CampaignShow from './components/common/CampaignShow'

import Tests from './components/common/Tests'
import DgTest from './components/common/DgTest'

class App extends React.Component {

  state = {
    theme: 'light'
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

  changeTheme = () => {
    const theme = this.state.theme === 'light' ? 'dark' : 'light'
    this.setState({ theme })
  }

  notify = content => console.log(content)

  render() {
    const { theme } = this.state
    // TODO if unauthorized redirect to landing page
    return (
      <ThemeProvider theme={this.themes[theme]}>
        <BrowserRouter>
          <NavBar changeTheme={this.changeTheme}/>
          <Switch>
            <Route path='/tests' component={Tests} />
            <Route path='/dgtests' component={DgTest} />
            <Route exact path="/" component={Home} />
            <Route path="/chat/:room" component={Room} />
            {/* path /campaign/:id/coordinator -> volunteer view panel */}
            <Route path='/campaigns/:id' component={CampaignShow} />
            <Route path='/campaigns' component={CampaignIndex} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App