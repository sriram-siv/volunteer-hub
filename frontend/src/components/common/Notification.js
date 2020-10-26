import React from 'react'

const NotificationContext = React.createContext()

class NotificationProvider extends React.Component {

  state = {

  }

  testNotify = (val) => {
    console.log(val)
  }

  render() {
    return (
      'hi'
      // <NotificationContext.Provider value="testttingingin">
      //   {this.props.children}
      // </NotificationContext.Provider>
    )
  }
}

export { NotificationProvider, NotificationContext }