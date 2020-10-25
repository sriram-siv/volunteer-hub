import React from 'react'
import styled from 'styled-components'

class MessageBox extends React.Component {
  
  Wrapper = styled.div`
    position: relative;
    transform: ${() => this.props.isSelf ? 'scaleX(-1)' : 'none'};
  `

  Box = styled.div`
    display: inline-block;
    position: relative;
    min-width: 200px;
    margin: 10px 10px 10px 25px;
    padding: 10px;
    padding-top: ${() => this.props.isSelf ? '10px' : '5px'};
    background-color: ${props => this.props.isSelf ? '#eee' : props.theme.background};
    border-radius: 2px;
    box-shadow: ${() => this.props.isSelf ? '-1px 2px 2px #ddd' : '1px 2px 2px #ddd'};
  `

  Accent = styled.div`
    position: absolute;
    top: 0;
    left: -15px;
    width: 20px;
    height: 20px;
    background-color: ${props => this.props.isSelf ? '#eee' : props.theme.background};
    clip-path: polygon(100% 0, 0 0, 100% 100%);
  `

  AccentShadow = styled.div`
    position: absolute;
    top: 13px;
    left: 10px;
    width: 20px;
    height: 20px;
    background-color: #ddd;
    clip-path: polygon(100% 0, 0 0, 100% 100%);
    filter: blur(10px);
  `

  Name = styled.div`
    font-size: 0.7rem;
    color: palevioletred;
    transform: ${() => this.props.isSelf ? 'scaleX(-1)' : 'none'};
  `

  Text = styled.p`
    color: ${props => props.theme.text};
    font-size: 0.85rem;
    line-height: 1.2rem;
    height: 1.2rem;
    margin: 0;
    width: 100%;
    transform: ${() => this.props.isSelf ? 'scaleX(-1)' : 'none'};
  `

  Link = styled.a`
    background-color: pink;
    cursor: pointer;
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
  
  render() {
    const { data, isSelf } = this.props
    const { Wrapper, Accent, AccentShadow, Box, Text, Name, Link, linkMatch } = this
    // const isSelf = localStorage.getItem('user_id') === data.user_id.id
    return (
      <Wrapper>
        <AccentShadow/>
        <Box>
          <Accent/>
          {!isSelf && <Name>{data.user_id.username}</Name>}
          {data.text.split('\n').map((line, i) => {
            const interpolated = this.interpolateLinks(line)
            return <Text key={i}>{interpolated.map(frag => (
              frag.match(linkMatch) ? <Link>{frag}</Link> : frag
            ))}</Text>
          })}
        </Box>
      </Wrapper>
    )
  }
}

export default MessageBox