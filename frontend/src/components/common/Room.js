import React from 'react'

import Button from '../elements/Button'
import MessageBox from '../elements/MessageBox'

class Room extends React.Component {

  state = {
    messages: [],
    draft: ''
  }

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
      this.setState({ messages: [...this.state.messages, data.message ] })
    }

    this.chatSocket.onclose = () => console.error('Chat socket closed unexpectedly')
    console.log(this.chatSocket)
  }

  sendMessage = event => {
    event.preventDefault()
    this.chatSocket.send(JSON.stringify({
      'text': this.state.draft,
      'user': 'volunteer_55'
    }))
    this.setState({ draft: '' })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    const { messages, draft } = this.state
    return (
      <>
        <div style={{ backgroundColor: 'papayawhip', height: '200px', overflowY: 'scroll' }}>
          {messages.map((message, i) => <MessageBox key={i} data={message} isSelf={i % 2 === 0} />)}
        </div>
        <form style={{ marginTop: '5px' }}>
          <input type="text" style={{ display: 'inline-block', marginLeft: '5px', paddingTop: '3px', width: 'calc(100% - 120px)' }} className="form-control" name="draft" value={draft} onChange={this.handleChange} />
          <span style={{ display: 'inline-block', width: '10px' }} />
          <Button style={{ width: '100px' }} width="100px" onClick={this.sendMessage} label="send" />
        </form>
      </>
    )
  }
}

export default Room