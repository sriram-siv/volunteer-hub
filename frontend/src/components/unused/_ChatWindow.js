import React from 'react'
import styled from 'styled-components'

import MessageBox from '../elements/MessageBox'

const Wrapper = styled.section`
  height: calc(100vh - 10rem - 55px);
  overflow-y: scroll;
  background-color: ${props => props.theme.panels};
  scroll-behavior: ${props => props.historyLoaded ? 'smooth' : 'auto'};
`

const ChatWindow = ({ messages, setRef, historyLoaded }) => {
  const userID = Number(localStorage.getItem('user_id'))
  return (
    <Wrapper ref={ref => setRef(ref)} historyLoaded={historyLoaded}>
      {messages.map((message, i) => <MessageBox key={i} prevMessage={messages[i - 1]} data={message} isSelf={message.user.id === userID} />)}
    </Wrapper>
  )
}

export default ChatWindow