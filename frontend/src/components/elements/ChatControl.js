import React from 'react'
import styled from 'styled-components'
import icons from '../../lib/icons'

const Wrapper = styled.div`
  background-color: ${props => props.theme.shadow};
  height: 30px;
  border-radius: 0 0 2px 2px;
`

const Button = styled.button`
  font-size: 0.75rem;
  background-color: ${props => props.theme.shadow};
  border: none;
  margin: 1px;
  float: ${props => props.position};
  height: calc(100% - 2px);
  border-bottom-left-radius: ${props => props.corner && props.position === 'left' ? '2px' : 0};
  border-bottom-right-radius: ${props => props.corner && props.position === 'right' ? '2px' : 0};

  &:hover {
    background-color: #ddd;
  }
`

const IconSpan = styled.span`
  display: inline-block;
  position: relative;
  transform: rotateZ(90deg);
`

const ChatControl = ({ send, showMembers, toggleEmoji }) => {
  return (
    <Wrapper>
      {showMembers && <Button position="left" corner>members</Button>}
      <Button position="right" corner onClick={send}><IconSpan>{icons.send('#232323', 16)}</IconSpan></Button>
      <Button position="right" onClick={toggleEmoji}>😀</Button>
    </Wrapper>
  )
}

export default ChatControl