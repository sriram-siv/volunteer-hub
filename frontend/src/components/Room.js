import React from 'react'

class Room extends React.Component {

  componentDidMount = () => {
    this.connectToSocket()
    



  }

  connectToSocket = () => {
    // TODO Replace this for deployment
    const domain = 'localhost:8000'
    this.chatSocket = new WebSocket(
      `ws://${domain}/ws/chat/${this.props.match.params.room}/`
    )

    this.chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data)
      console.log(data)
    }

    this.chatSocket.onclose = () => console.error('Chat socket closed unexpectedly')
    console.log(this.chatSocket)
  }

  sendMessage = () => {
    this.chatSocket.send(JSON.stringify({
      'text': 'hello',
      'user': 'volunteer_55'
    }))
  }

  render() {
    return (
      <div>
        <button onClick={this.sendMessage} >click</button>
      </div>
    )
  }
}

export default Room