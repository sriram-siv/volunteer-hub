import React from 'react'
import styled from 'styled-components'
import { Picker } from 'emoji-mart'
import icons from '../../lib/icons'

const Wrapper = styled.div`
  background-color: ${props => props.theme.shadow};
  height: 30px;
  border-radius: 0 0 2px 2px;
  padding: 1px;
`

const Button = styled.button`
  background-color: transparent;
  border: none;
  float: right;
  &:hover {
    background-color: #ddd;
  }
`

const IconSpan = styled.span`
  display: inline-block;
  transform: rotateZ(90deg);
`

const EmojiPicker = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
`

const ChatControl = ({ send, pickEmoji }) => {
  const [showEmoji, setShowEmoji] = React.useState(false)
  const toggleEmoji = () => setShowEmoji(!showEmoji)
  return (
    <Wrapper>
      <Button position="right" corner onClick={send}>
        <IconSpan>{icons.send('#232323', 16)}</IconSpan>
      </Button>
      <Button position="right" onClick={toggleEmoji}>
        <span role="img" aria-label="emoji menu">😀</span>
      </Button>
      <EmojiPicker show={showEmoji} onBlur={toggleEmoji}>
        <Picker onSelect={pickEmoji} />
      </EmojiPicker>
    </Wrapper>
  )
}

export default ChatControl