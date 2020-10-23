import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  top: calc(3rem + 15px);
  right: 30px;
  background-color: grey;
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
  
`

class MemberList extends React.Component {

  state = {
    view: 'badges'
  }

  toggleView = () => {
    this.setState({ view: !this.state.view })
  }

  members = [ 'Sri', 'Don', 'Ren', 'Liam', 'Charlotte', 'Jack' ]

  render() {
    return (
      <Wrapper>
        {this.state.view === 'badges' && <>
          <Badge onClick={this.toggleView}>count</Badge>
          {this.members.slice(0, 5).map((member, i) => <Badge key={i} position={i}>{member}</Badge>)}
        </>}
        {this.state.view === 'list' && <>

        </>}
      </Wrapper>
    )
  }
}

export default MemberList