import React from 'react'
import styled from 'styled-components'

const MessageBox = ({ data, isSelf }) => {

  const Wrapper = styled.div`
    position: relative;
    transform: ${() => isSelf ? 'scaleX(-1)' : 'none'};
  `

  const Box = styled.div`
    display: inline-block;
    position: relative;
    min-width: 200px;
    margin: 10px 10px 10px 25px;
    padding: 10px;
    padding-top: ${() => isSelf ? '10px' : '5px'};
    background-color: ${props => isSelf ? '#eee' : props.theme.background};
    border-radius: 2px;
    box-shadow: ${() => isSelf ? '-1px 2px 2px #ddd' : '1px 2px 2px #ddd'};
  `

  const Accent = styled.div`
    position: absolute;
    top: 0;
    left: -15px;
    width: 20px;
    height: 20px;
    background-color: ${props => isSelf ? '#eee' : props.theme.background};
    clip-path: polygon(100% 0, 0 0, 100% 100%);
  `

  const AccentShadow = styled.div`
    position: absolute;
    top: 13px;
    left: 10px;
    width: 20px;
    height: 20px;
    background-color: #ddd;
    clip-path: polygon(100% 0, 0 0, 100% 100%);
    filter: blur(10px);
  `

  const Name = styled.div`
    font-size: 0.7rem;
    color: palevioletred;
    transform: ${() => isSelf ? 'scaleX(-1)' : 'none'};
  `

  const Text = styled.p`
    font-size: 0.85rem;
    margin: 0;
    width: 100%;
    transform: ${() => isSelf ? 'scaleX(-1)' : 'none'};
  `
  
  return (
    <Wrapper>
      <AccentShadow/>
      <Box>
        <Accent/>
        {!isSelf && <Name>{data.user}</Name>}
        <Text>{data.text.map(line => line)}</Text>
      </Box>
    </Wrapper>
  )
}

export default MessageBox