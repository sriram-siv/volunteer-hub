import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  top: calc(3rem + 15px);
  right: -5px;
  background-color: none;
  padding: 10px;
  border-radius: 5px;
`

const Badge = styled.div`
  position: relative;
  left: ${props => `${props.position * 17 + 10}px`};
  width: 50px;
  height: 50px;
  background-color: papayawhip;
  clip-path: circle();
  border: 2px solid palevioletred;
  border-radius: 50%;
  line-height: 50px;
  text-align: center;
  font-family: 'Montserrat Alternates', sans-serif;
`

const List = styled.div`
  position: absolute;
  top: calc(3rem + 5px);
  right: 5px;
  width: 200px;
  height: 250px;
  background-color: ${props => `${props.theme.shadow}dd`};
  border-radius: 2px;
`

const ListScroll = styled.div`
  margin-top: 5px;
  height: 205px;
  overflow-y: scroll;
`

const MemberDetail = styled.div`
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  margin: 0 5px 5px;
  border-radius: 2px;
`

const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 4rem;
  height: 30px;
  line-height: 30px;
  border-radius: 2px;
  background-color: papayawhip;
  text-align: center;
`

const Title = styled.div`
  text-align: center;
  line-height: 30px;
  padding-top: 5px;
  color: #333;
  font-family: 'Montserrat Alternates', sans-serif;
`

class MemberList extends React.Component {

  state = {
    view: 'badges'
  }

  toggleView = () => {
    const view = this.state.view === 'badges' ? 'list' : 'badges'
    this.setState({ view })
  }

  members = [ 'Sri', 'Don', 'Ren', 'Liam', 'Charlotte', 'Jack' ]

  render() {
    return (
      <List>
        <Title>Members</Title>
        <ListScroll>
          {this.members.map((member, i) => <MemberDetail key={i}>{member}</MemberDetail>)}
        </ListScroll>
      </List>
    )
  }
}

export default MemberList