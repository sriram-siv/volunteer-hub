import React from 'react'
import styled from 'styled-components'
import { Picker } from 'emoji-mart'
import icons from '../../lib/icons'

import InputArea from './InputArea'

const Wrapper = styled.div`
  width: 100%;
  height: calc(4rem + 40px);
  background-color: ${props => props.theme.background};
`

const ToolBar = styled.div`
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

const ChatControl = ({ send, handleChange, value, label }) => {

  const [showEmoji, setShowEmoji] = React.useState(false)

  const toggleEmoji = () => setShowEmoji(!showEmoji)

  const pickEmoji = emoji => {
    handleChange({ target: { value: value + emoji.native } })
  }

  return (<Wrapper>
    <InputArea
      width="100%"
      name="draft"
      value={value}
      returnValue={handleChange}
      submit={send}
      label={label}
    />
    <ToolBar>
      <Button position="right" corner onClick={send}>
        <IconSpan>{icons.send('#232323', 16)}</IconSpan>
      </Button>
      <Button position="right" onClick={toggleEmoji}>
        <span role="img" aria-label="emoji menu">😀</span>
      </Button>
      <EmojiPicker show={showEmoji} onBlur={toggleEmoji}>
        <Picker onSelect={pickEmoji} />
      </EmojiPicker>
    </ToolBar>
  </Wrapper>)
}

export default ChatControl