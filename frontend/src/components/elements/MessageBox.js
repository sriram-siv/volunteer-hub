import React from 'react'
import styled from 'styled-components'

// class MessageBox extends React.Component {
  
const  Wrapper = styled.div`
  position: relative;
  transform: ${props => props.isSelf ? 'scaleX(-1)' : 'none'};

  .box {
    width: fit-content;
    min-width: 200px;
    margin: 10px 10px 10px 25px;
    padding: 15px;
    padding-top: ${props => props.isSelf ? '15px' : '10px'};
    background-color: ${props => props.isSelf ? props.theme.accent : props.theme.panels};
    border-radius: 2px;
    border-top-left-radius: 0;
    z-index: 2;
  }

  .shadow {
    z-index: 1;
  }

  > :nth-child(1) {
    position: relative;
  }
  > :nth-child(2) {
    position: absolute;
    top: -9px;
    left: -1px;
    background-color: ${props => props.theme.name === 'light' ? '#bbb' : '#333'};
    filter: blur(1px);
  }

  .accent {
    position: absolute;
    top: 0;
    left: -14px;
    width: 15px;
    height: 15px;
    background-color: inherit;
    clip-path: polygon(100% 0, 0 0, 100% 100%);
  }

  a {
    color: ${props => props.isSelf && props.theme.name === 'dark' ? 'rebeccapurple' : 'palevioletred'};
    font-weight: 600;
    letter-spacing: 0;
  }

  p {
    color: ${props => props.isSelf ? '#333' : props.theme.text};
    font-size: 0.85rem;
    font-weight: ${props => props.theme.fontWeight};
    letter-spacing: ${props => props.theme.letterSpacing};
    line-height: 1.2rem;
    margin: 0;
    transform: ${props => props.isSelf ? 'scaleX(-1)' : 'none'};
  }

  .name {
    font-size: 0.7rem;
    font-weight: 600;
    color: palevioletred;
    margin-bottom: 3px;
  }
`

const MessageBox = ({ data, isSelf, prevMessage }) => {

  const linkMatch = /(http(s)?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g

  const interpolateLinks = line => {
    // Get two arrays for plaintext and links
    const links = line.match(linkMatch)
    const plain = line.split(linkMatch).filter(res => res)
    
    const joined = links ? plain.concat(links.reverse()) : plain
    const interpolated = []
    // Determine first element to decide interpolation pattern
    const startsPlain = line.startsWith(plain[0])
    let getStart = startsPlain
    while (joined.length > 0) {
      if (getStart) interpolated.push(joined.shift())
      else interpolated.push(joined.pop())
      getStart = !getStart
    }
    return interpolated
  }

  const getHref = address => (
    address.startsWith('http') ? address : `http://${address}`
  )
  
  const consecutiveMessage = prevMessage
    ? prevMessage.user.id === data.user.id : false
  
  const content = <>
    <div className="accent" />

    {!isSelf && !consecutiveMessage && <p className="name">{data.user.username}</p>}

    {data.text.split('\n').map((line, i) => (

      <p key={i}>
        {interpolateLinks(line).map((frag, j) => (
          frag.match(linkMatch)
            ? <a key={j} href={getHref(frag)} rel="noreferrer" target="_blank">{frag}</a>
            : frag
        ))}
      </p>
      
    ))}
  </>

  return (
    <Wrapper isSelf={isSelf}>
      <div className="box">
        {content}
      </div>
      <div className="box shadow">
        {content}
      </div>
    </Wrapper>
  )

}

export default MessageBox