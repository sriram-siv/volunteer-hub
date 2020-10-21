import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
      <>
        <input type="text" />
        <Link to="/chat/my_room" >Go</Link>
      </>
    )
  }
}

export default Home