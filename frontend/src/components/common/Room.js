import React from 'react'
import styled from 'styled-components'

import { getSingleRoom } from '../../lib/api'

import ChatWindow from '../elements/ChatWindow' 
import InputArea from '../elements/InputArea'
import ChatControl from '../elements/ChatControl'

const ControlWrapper = styled.div`
  background-color: ${props => props.theme.panels};
  padding: 10px;
`

class Room extends React.Component {

  state = {
    messages: [],
    draft: '',
    historyLoaded: false
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

    this.chatSocket.addEventListener('open', this.getChatHistory())

    this.chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data)
      console.log(data.message)
      this.setState({ messages: [...this.state.messages, data.message] })
      this.chatWindow.scrollTop = this.chatWindow.scrollHeight
    }

    this.chatSocket.onclose = () => console.error('Chat socket closed unexpectedly')
    console.log(this.chatSocket)
  }

  getChatHistory = async () => {
    // get request to room (id)
    const response = await getSingleRoom(this.props.match.params.room)
    const { members, messages } = response.data
    console.log(members) //redirect here
    this.setState({ members, messages }, () => {
      this.chatWindow.scrollTop = this.chatWindow.scrollHeight
      this.setState({ historyLoaded: true })
    })
  }

  sendMessage = event => {
    event.preventDefault()
    if (!this.state.draft) return
    this.chatSocket.send(JSON.stringify({
      'room_id': this.props.match.params.room,
      'text': this.state.draft.trim(),
      'user': localStorage.getItem('token')
    }))
    this.setState({ draft: '' })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { messages, draft, historyLoaded } = this.state
    return (
      <>
        <ChatWindow setRef={ref => this.chatWindow = ref} messages={messages} historyLoaded={historyLoaded}/>
        <ControlWrapper>
          <InputArea
            width="100%"
            name="draft" value={draft}
            returnValue={this.handleChange}
            submit={this.sendMessage}
          />
          <ChatControl />
        </ControlWrapper>
      </>
    )
  }
}

export default Room