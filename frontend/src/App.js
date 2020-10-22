import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavBar from './components/common/NavBar'
import Home from './components/common/Home'
import Room from './components/common/Room'
import CampaignIndex from './components/common/CampaignIndex'

class App extends React.Component {

  render() {
    const path = window.location.pathname
    // TODO if unauthorized redirect to landing page
    return (
      <BrowserRouter>
        {path !== '/' && <NavBar />}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/chat/:room" component={Room} />
          <Route path='/campaigns' component={CampaignIndex} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App