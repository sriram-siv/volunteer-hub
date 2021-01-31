import React from 'react'
import styled from 'styled-components'

class MessageBox extends React.Component {
  
  Wrapper = styled.div`
    position: relative;
    transform: ${() => this.props.isSelf ? 'scaleX(-1)' : 'none'};
  `

  Box = styled.div`
    position: relative;
    width: fit-content;
    min-width: 200px;
    margin: 10px 10px 10px 25px;
    padding: 15px;
    padding-top: ${() => this.props.isSelf ? '15px' : '10px'};
    background-color: ${props => this.props.isSelf ? props.theme.glass : props.theme.panels};
    border-radius: 2px;
    border-top-left-radius: 0;
    box-shadow: ${(props) => this.props.isSelf
    ? `1px 2px 2px ${props.theme.name === 'light' ? '#ddd' : '#111'}`
    : `-1px 2px 2px ${props.theme.name === 'light' ? '#ddd' : '#111'}`};
    `

  Accent = styled.div`
    position: absolute;
    top: 0;
    left: -15px;
    width: 15px;
    height: 15px;
    background-color: ${props => this.props.isSelf ? props.theme.glass : props.theme.panels};
    clip-path: polygon(100% 0, 0 0, 100% 100%);
  `

  AccentShadow = styled.div`
    position: absolute;
    top: 4px;
    left: 10px;
    width: 20px;
    height: 20px;
    background-color: ${props => props.theme.name === 'light' ? '#ddd' : '#111'};
    clip-path: polygon(100% 0, 0 0, 100% 100%);
    filter: blur(10px);
  `

  Name = styled.div`
    font-size: 0.7rem;
    color: palevioletred;
    transform: ${() => this.props.isSelf ? 'scaleX(-1)' : 'none'};
  `

  Text = styled.p`
    color: ${props => this.props.isSelf ? '#333' : props.theme.text};
    font-size: 0.85rem;
    font-weight: ${props => props.theme.fontWeight};
    letter-spacing: ${props => props.theme.letterSpacing};
    line-height: 1.2rem;
    margin: 0;
    transform: ${() => this.props.isSelf ? 'scaleX(-1)' : 'none'};
  `

  Link = styled.a`
    color: palevioletred;
  `

  linkMatch = /(http(s)?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g

  interpolateLinks = line => {
    // Get two arrays for plaintext and links
    const links = line.match(this.linkMatch)
    const plain = line.split(this.linkMatch).filter(res => res)
    
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

  getHref = address => (
    address.startsWith('http') ? address : `http://${address}`
  )
  
  render() {
    const { data, isSelf, prevMessage } = this.props
    const { Wrapper, Accent, AccentShadow, Box, Text, Name, Link, linkMatch } = this
    const consecutiveMessage = prevMessage
      ? prevMessage.user.id === data.user.id : false

    return (
      <Wrapper consecutive={consecutiveMessage}>
        <AccentShadow/>
        <Box>
          <Accent/>
          {!isSelf && !consecutiveMessage && <Name>{data.user.username}</Name>}
          {data.text.split('\n').map((line, i) => {
            const interpolated = this.interpolateLinks(line)
            return <Text key={i}>{interpolated.map((frag, j) => (
              frag.match(linkMatch) ? <Link key={j} href={this.getHref(frag)} target="_blank">{frag}</Link> : frag
            ))}</Text>
          })}
        </Box>
      </Wrapper>
    )
  }
}

export default MessageBox