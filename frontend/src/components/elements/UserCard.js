import React from 'react'
import styled from 'styled-components'

import Schedule from './Schedule'

const Wrapper = styled.div`
  margin: 5px;
  margin-right: 2px;
  position: relative;
  height: ${props => props.expanded ? '17rem' : 'calc(3.4rem + 10px)'};
  transition: all 0.2s;
  background-color: ${props => props.isSelected ? 'lightgreen' : props.theme.panels};
  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  font-size: 0.85rem;
  line-height: 1.5rem;
  color: ${props => props.isSelected ? '#333' : props.theme.text};
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100px;

  margin: 2px;
`

const Button = styled.button`
  width: 100%;
  height: calc(50% - 1px);
  border: none;
  background-color: ${props => props.isSelected ? 'transparent' : props.theme.panels};
  transition: all 0.2s;
  &:hover {
    background-color: ${props => props.color};
  }
  &:focus {
    outline: none;
  }
`

const Body = styled.div`
  padding: 5px 20px;
  display: flex;

`

const ProfilePic = styled.img`
  width: 60px;
  height: 60px;
  clip-path: circle();
`

const Details = styled.div`
  padding: 5px;
  p {
    line-height: 1rem;
    margin: 5px 10px;
  }
`

class UserCard extends React.Component {

  state = {
    denyActive: false,
    isSelected: false
  }

  clickDeny = () => {
    if (!this.state.denyActive) {
      this.setState({ denyActive: true }, () => {
        this.clickInterval = setTimeout(() => this.setState({ denyActive: false }), 2000)
      })
    } else this.props.deny(this.props.user.id)
  }

  clickSelect = () => {
    this.props.select(this.props.user.id)
    this.setState({ isSelected: !this.state.isSelected })
  }

  componentWillUnmount = () => {
    clearInterval(this.clickInterval)
  }

  render() {
    const { user, confirm, showDetail, expanded, pending } = this.props
    const { denyActive, isSelected } = this.state

    const schedule = Array.from({ length: 14 }).fill(false)
    user.user_shifts.forEach(shift => schedule[shift.id - 1] = true)

    return (
      <Wrapper expanded={expanded} isSelected={isSelected} >
        <Header>
          <Title fullWidth={!pending} onClick={() => showDetail(user.id)}>{user.username}</Title>
          <Control>
            {this.props.confirm && <Button color="#afa" onClick={() => confirm(user.id)}>accept</Button>}
            {this.props.deny && <Button color={denyActive ? '#f55' : '#faa'} onClick={this.clickDeny}>{denyActive ? 'sure?' : 'deny'}</Button>}
            {this.props.select && <Button isSelected={isSelected} onClick={this.clickSelect}>{isSelected ? 'deselect' : 'select'}</Button>}
          </Control>
        </Header>
        <Body>
          <ProfilePic src={user.profile_image} />
          <Details>
            <p>{user.first_name} {user.last_name}</p>
            <p>{user.user_skills.map(skill => skill.name).join(', ')}</p>
          </Details>
        </Body>
        <div style={{ margin: '5px auto', width: 'calc(100% - 10px)' }}>
          <Schedule schedule={schedule} />
        </div>
      </Wrapper>
    )
  }
}

export default UserCard