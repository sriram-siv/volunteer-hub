import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Room from './components/Room'
import Map from './components/map/Map'

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/chat/:room" component={Room} />
          <Route path='/map' component={Map} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App