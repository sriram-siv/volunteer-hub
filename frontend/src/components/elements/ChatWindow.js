import React from 'react'
import styled from 'styled-components'

import MessageBox from './MessageBox'

const Wrapper = styled.section`
  height: calc(100vh - 7rem - 20px);
  overflow-y: scroll;
  background-color: papayawhip;
  scroll-behavior: smooth;
`

const ChatWindow = ({ messages, setRef }) => {
  return (
    <Wrapper ref={ref => setRef(ref)}>
      {messages.map((message, i) => <MessageBox key={i} data={message} isSelf={i % 2 === 0} />)}
    </Wrapper>
  )
}

export default ChatWindow