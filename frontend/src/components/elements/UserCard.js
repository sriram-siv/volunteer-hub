import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 5px;
  margin-right: 2px;
  position: relative;
  height: ${props => props.expanded ? '10rem' : 'calc(3.4rem + 10px)'};
  /* opacity: ${props => props.visible ? 1 : 0}; */
  transition: all 0.2s;

  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  font-size: 0.85rem;
  line-height: 1.5rem;
  color: ${props => props.theme.text};
  font-weight: ${props => props.theme.fontWeight};
  overflow-y: hidden;
`

const Header = styled.div`
  display: flex;
  height: calc(3.4rem + 10px);
`

const Title = styled.div`
  width: calc(100% - 100px);
  line-height: calc(3.4rem + 10px);
  padding-left: 15px;
`

const Control = styled.div`
  width: 100px;

  margin: 2px;
`

const Button = styled.button`
  width: 100%;
  height: calc(50% - 1px);
  border: none;
  background-color: ${props => props.theme.background};
  transition: all 0.2s;
  &:hover {
    background-color: ${props => props.color};
  }
  &:focus {
    outline: none;
  }
`

class UserCard extends React.Component {

  state = {
    denyActive: false
  }

  clickDeny = () => {
    if (!this.state.denyActive) {
      this.setState({ denyActive: true }, () => {
        setTimeout(() => this.setState({ denyActive: false }), 2000)
      })
    } else this.props.deny(this.props.user.id)
  }

  render() {
    const { user, confirm, showDetail, expanded } = this.props
    const { denyActive } = this.state
    return (
      <Wrapper expanded={expanded} >
        <Header>
          <Title onClick={() => showDetail(user.id)}>{user.username}</Title>
          <Control>
            <Button color="#afa" onClick={() => confirm(user.id)}>accept</Button>
            <Button color={denyActive ? '#f55' : '#faa'} onClick={this.clickDeny}>{denyActive ? 'sure?' : 'deny'}</Button>
          </Control>
        </Header>
        {console.log(user)}
      </Wrapper>
    )
  }
}

export default UserCard