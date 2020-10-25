import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: ${props => props.theme.shadow};
  height: 30px;
  border-radius: 0 0 2px 2px;
`

const Button = styled.button`

  background-color: white;
  border: none;
  margin: 2px;
  float: right;
`

const ChatController = () => {
  return (
    <Wrapper>
      <Button>send</Button>
      <Button>members</Button>
    </Wrapper>
  )
}

export default ChatController