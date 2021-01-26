import React from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

const SubRouter = () => {

  const match = useRouteMatch()
  const history = useHistory()

  return <>
    <button onClick={() => history.push(`${match.path}/settings`)}>settings</button>
    <button onClick={() => history.push(`${match.path}/members`)}>members</button>
    <br />
    <Switch>
      <Route path={`${match.path}/settings`}>
        viewing settings
      </Route>
      <Route path={`${match.path}/members`}>
        viewing members
      </Route>
    </Switch>
  </>
}

export default SubRouter