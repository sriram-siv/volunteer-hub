import React from 'react'
import styled from 'styled-components'

import MessageBox from './MessageBox'

const Wrapper = styled.section`
  height: calc(100vh - 7rem - 50px);
  overflow-y: scroll;
  background-color: ${props => props.theme.panels};
  scroll-behavior: smooth;
`

const ChatWindow = ({ messages, setRef }) => {
  const userID = Number(localStorage.getItem('user_id'))
  return (
    <Wrapper ref={ref => setRef(ref)}>
      {messages.map((message, i) => <MessageBox key={i} data={message} isSelf={message.user.id === userID} />)}
    </Wrapper>
  )
}

export default ChatWindow