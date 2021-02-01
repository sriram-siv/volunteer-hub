import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import 'emoji-mart/css/emoji-mart.css'

import { getSingleRoom } from '../../lib/api'

import { AppContext } from '../../App'

import ChatControl from '../elements/ChatControl'
import MessageBox from '../elements/MessageBox'

const Wrapper = styled.div`
  background-color: ${props => props.theme.background};
  height: calc(100vh - 3rem);
  padding: 5px;
`

const Header = styled.div`
  position: relative;
  width: 100%;
  padding-left: 20px;
  line-height: 3rem;
  background-color: ${props => props.theme.primary};
  border-radius: 2px;
  color: #333;
`

const Body = styled.div`
  position: relative;
  top: 0px;
  /* background-color: ${props => props.theme.background}; */
  width: 100%;
  height: calc(100% - 7rem - 30px);
  overflow-y: scroll;
  scroll-behavior: ${props => props.smoothScroll ? 'smooth' : 'auto'};
`

const ShowMembers = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  border-radius: 3px;
  border: 1px solid #222;
  background-color: ${props => props.theme.primary};
  font-size: 0.85rem;
  padding: 0 10px;
  height: calc(3rem - 10px);
  line-height: 2rem;

  &:focus {
    outline: none;
  }
  &:focus-visible {
    right: 3px;
    border: 3px solid blue;
  }
`

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: #333a;

  opacity: ${props => props.show ? 1 : 0};
  pointer-events: ${props => props.show ? 'all' : 'none'};


  transition: opacity 0.2s;

  .panel {
    width: 250px;
    height: 300px;
    border-radius: 4px;
    background-color: ${props => props.theme.panels};
    overflow-y: scroll;
  }

  .member-card {
    text-align: center;
    line-height: 2rem;
    background-color: ${props => props.theme.shadow};
    border-radius: 4px;
    margin: 5px;
    margin-right: 2px;
  }
`

let chatSocket
const chatWindow = {
  element: null,
  scrollToBottom() {
    setTimeout(() => this.element.scrollTop = this.element.scrollHeight, 1)
  }
}

const Room = () => {

  const app = useContext(AppContext)

  const history = useHistory()
  const params = useParams()

  const [name, setName] = useState('')
  const [members, setMembers] = useState([])
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [historyLoaded, setHistoryLoaded] = useState(false)
  const [smoothScroll, setSmoothScroll] = useState(false)
  
  const [newMessage, setNewMessage] = useState()
  const [showMembers, setShowMembers] = useState(false)

  useEffect(() => {
    if (newMessage) {
      setMessages(messages.concat(newMessage))
      setNewMessage(null)
    }
  }, [newMessage])

  const connectToSocket = () => {
    const wsScheme = window.location.protocol === 'https:' ? 'wss' : 'ws'
    const domain = window.location.hostname === 'localhost' ? 'localhost:8000' : window.location.hostname
    chatSocket = new WebSocket(
      `${wsScheme}://${domain}/ws/chat/${params.room}/`
    )

    chatSocket.onmessage = e => {
      const data = JSON.parse(e.data)
      setNewMessage(data.message)
      chatWindow.scrollToBottom()
    }

    // chatSocket.onclose = () => console.log('Chat socket closed unexpectedly')
  }

  // const getChatHistory = async () => {
  //   try {
  //     const { data } = await getSingleRoom(params.room)
  //     setName(data.name)
  //     setMembers(data.members)
  //     setMessages(data.messages)
  //     setHistoryLoaded(true)

  //     connectToSocket()
  //   } catch (err) {
  //     console.log(err)
  //     history.goBack()
  //   }
  // }

  const getChatHistory = () => {
    getSingleRoom().then(
      res => {
        console.log(res)
        setName(res.data.name)
        setMembers(res.data.members)
        setMessages(res.data.messages)
        setHistoryLoaded(true)
      },
      res => {
        console.error(res)
      }
    )
  }

  const sendMessage = event => {
    event.preventDefault()
    if (!draft) return
    chatSocket.send(JSON.stringify({
      'room_id': params.room,
      'text': draft.trim(),
      'user': localStorage.getItem('token')
    }))
    setDraft('')
  }

  const handleChange = event => setDraft(event.target.value)

  const setChatWindowRef = ref => {
    if (!historyLoaded && ref) {
      chatWindow.element = ref
      chatWindow.scrollToBottom()
    } else if (!smoothScroll) {
      setTimeout(() => setSmoothScroll(true), 100)
    }
  }

  useEffect(() => {
    getChatHistory()
    return () => chatSocket.close()
  }, [])

  return (
    <Wrapper>

      <Header>
        {name}
        <ShowMembers onClick={() => setShowMembers(true)}>
          group members
        </ShowMembers>
      </Header>
      
      <Body ref={setChatWindowRef} smoothScroll={smoothScroll}>
        {messages && messages.map((message, i) =>
          <MessageBox key={i} prevMessage={messages[i - 1]} data={message} isSelf={message.user.id === app.userID()} />)}
      </Body>
      
      <div style={{ position: 'absolute', bottom: 0, width: 'calc(100% - 10px)' }}>
        <ChatControl value={draft} handleChange={handleChange} send={sendMessage} />
      </div>

      {/* <Modal show={showMembers} count={members.length} onClick={() => setShowMembers(false)}> */}
      <Modal show={showMembers} onClick={() => setShowMembers(false)}>
        <div className="panel" onClick={e => e.stopPropagation()}>
          {members && members.map((member, i) => 
            <div key={i} className="member-card">{member.username}</div>
          )}
        </div>
      </Modal>
    
    </Wrapper>
  )
}

export default Room