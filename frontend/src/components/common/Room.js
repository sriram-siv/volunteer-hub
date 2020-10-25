import React from 'react'

import Button from '../elements/Button'
import MessageBox from '../elements/MessageBox'
import ChatWindow from '../elements/ChatWindow' 
import InputArea from '../elements/InputArea'

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
      this.setState({ messages: [...this.state.messages, data.message] })
      this.chatWindow.scrollTop = this.chatWindow.scrollHeight
    }

    this.chatSocket.onclose = () => console.error('Chat socket closed unexpectedly')
    console.log(this.chatSocket)
  }

  sendMessage = event => {
    event.preventDefault()
    if (!this.state.draft) return
    this.chatSocket.send(JSON.stringify({
      'text': this.state.draft.trim(),
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
        {/* <div ref={ref => this.chatWindow = ref} style={{ backgroundColor: 'papayawhip', height: 'calc(100vh - 7rem - 20px', overflowY: 'scroll' }}>
          {messages.map((message, i) => <MessageBox key={i} data={message} isSelf={i % 2 === 0} />)}
        </div> */}
        <ChatWindow setRef={ref => this.chatWindow = ref} messages={messages}/>
        <div style={{ margin: '10px' }}>
          <InputArea
            width="100%"
            name="draft" value={draft}
            returnValue={this.handleChange}
            submit={this.sendMessage}
          />
        </div>
      </>
    )
  }
}

export default Room