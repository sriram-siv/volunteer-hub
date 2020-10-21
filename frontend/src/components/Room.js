import React from 'react'

class Room extends React.Component {

  componentDidMount = () => {

    const room = this.props.match.params.room

    this.chatSocket = new WebSocket(
      'ws://'
      + 'localhost:8000'
      + '/ws/chat/'
      + room
      + '/'
    )

    this.chatSocket.onmessage = function(e) {
      const data = JSON.parse(e.data)
      console.log(data)
    }

    this.chatSocket.onclose = () => console.error('Chat socket closed unexpectedly')

    console.log(this.chatSocket)



  }

  sendMessage = () => {
    this.chatSocket.send(JSON.stringify({
      'message': 'hello'
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