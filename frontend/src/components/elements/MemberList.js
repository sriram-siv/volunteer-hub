import React from 'react'
import styled from 'styled-components'
import icons from './Icons'

const List = styled.div`
  position: absolute;
  top: calc(3rem + 5px);
  right: 5px;
  width: 200px;
  height: ${props => props.isHidden ? '40px' : '290px'};
  background-color: ${props => `${props.theme.shadow}dd`};
  border-radius: 2px;
  overflow-y: hidden;
  transition: all 0.2s;
`

const ListScroll = styled.div`
  margin-top: 5px;
  height: 245px;
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

const Title = styled.div`
  text-align: center;
  line-height: 30px;
  padding-top: 5px;
  color: #333;
  `

const Toggle = styled.div`
  position: absolute;
  top: 7px;
  right: 15px;
`

class MemberList extends React.Component {

  state = {
    isHidden: true
  }

  toggleView = () => {
    this.setState({ isHidden: !this.state.isHidden })
  }

  members = [ 'Sri', 'Don', 'Ren', 'Liam', 'Charlotte', 'Jack' ]

  render() {
    const { isHidden } = this.state
    return (
      <List isHidden={isHidden}>
        <Toggle onClick={this.toggleView}>{isHidden ? icons.down() : icons.up()}</Toggle>
        <Title>Members</Title>
        <ListScroll>
          {this.members.map((member, i) => <MemberDetail key={i}>{member}</MemberDetail>)}
        </ListScroll>
      </List>
    )
  }
}

export default MemberList