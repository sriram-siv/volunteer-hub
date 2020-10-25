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
  `
  
  render() {
    const { data, isSelf } = this.props
    const { Wrapper, Accent, AccentShadow, Box, Text, Name, Link } = this
    const linkMatch = /(http(s)?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g

    return (
      <Wrapper>
        <AccentShadow/>
        <Box>
          <Accent/>
          {!isSelf && <Name>{data.user}</Name>}
          {data.text.split('\n').map((line, i) => {
            // const links = line.match(linkMatch)
            // const plain = line.split(linkMatch).filter(res => res)
            // const startsPlain = line.startsWith(plain[0])
            // const joined = plain.concat(links.reverse())
            // const inter = []
            // let getStart = startsPlain
            // while (joined.length > 0) {
            //   if (getStart) inter.push(joined.shift())
            //   else inter.push(joined.pop())
            //   getStart = !getStart
            // }
            // console.log(line)
            // console.log(inter)
            // return <Text key={i}>{inter.map(val => val.match(linkMatch) ? <Link href={val}>{val}</Link> : val)}</Text>
            return <Text ref={ref => console.log(ref ? ref : '') } key={i}>{line}</Text>
          })}
        </Box>
      </Wrapper>
    )
  }
}

export default MessageBox