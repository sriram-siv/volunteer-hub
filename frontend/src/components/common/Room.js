import React from 'react'
import styled from 'styled-components'
import 'emoji-mart/css/emoji-mart.css'

import { getSingleRoom } from '../../lib/api'

import ChatWindow from '../elements/ChatWindow' 
import InputArea from '../elements/InputArea'
import ChatControl from '../elements/ChatControl'
import List from '../elements/List'


const Wrapper = styled.div`
  background-color: ${props => props.theme.panels};
  padding-top: 5px;
`

const ControlWrapper = styled.div`
  background-color: ${props => props.theme.panels};
  padding: 10px;
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  height: 3rem;
  background-color: ${props => props.theme.shadow};
  margin: 0 5px;
  border-radius: 2px;
  color: #333;
`

const ListWrapper = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 1;
`

class Room extends React.Component {

  state = {
    name: '',
    members: [],
    messages: [],
    draft: '',
    historyLoaded: false
  }

  componentDidMount = () => {
    this.getChatHistory()
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
  }

  getChatHistory = async () => {
    try {
      const response = await getSingleRoom(this.props.match.params.room)
      const { name, members, messages } = response.data
      this.setState({ name, members, messages }, () => {
        this.chatWindow.scrollTop = this.chatWindow.scrollHeight
        this.setState({ historyLoaded: true })
      })
      this.connectToSocket()
    } catch (err) {
      this.props.history.goBack()
    }
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

  pickEmoji = emoji => {
    this.setState({ draft: this.state.draft + emoji.native })
  }

  render() {
    const { name, messages, draft, historyLoaded } = this.state
    const memberItems = this.state.members.map(volunteer => ({ name: volunteer.username, id: volunteer.id, onClick: () => console.log('user ' + volunteer.username) }))
    return (
      <Wrapper>
        <Header>
          {name}
          <ListWrapper>
            <List title="group members" items={memberItems} onToggle={() => console.log('toggle list')}/>
          </ListWrapper>
        </Header>
        <ChatWindow setRef={ref => this.chatWindow = ref} messages={messages} historyLoaded={historyLoaded}/>
        <ControlWrapper>
          <InputArea
            width="100%"
            name="draft" value={draft}
            returnValue={this.handleChange}
            submit={this.sendMessage}
          />
          <ChatControl send={this.sendMessage} pickEmoji={this.pickEmoji} />
        </ControlWrapper>
      </Wrapper>
    )
  }
}

export default Room