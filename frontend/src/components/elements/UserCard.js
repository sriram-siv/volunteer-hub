import React from 'react'
import styled from 'styled-components'

import Schedule from './Schedule'

const Wrapper = styled.div`
  margin: 5px;
  margin-right: 2px;
  position: relative;
  height: ${props => props.expanded ? '19 rem' : '3rem'};
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
  height: 3rem;
`

const Title = styled.div`
  width: calc(100% - 120px);
  line-height: 3rem;
  padding-left: 15px;
`

const Control = styled.div`
  display: flex;
  flex-direction: row;
  width: 120px;
`

const Button = styled.button`
  width: 100%;
  min-width: 60px;
  height: 3rem;
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
  padding: 5px 10px;
  display: flex;
  height: 8rem;
`

const ProfilePic = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`

const Details = styled.div`
  margin: 0 15px;
  p {
    margin-bottom: 5px;
    line-height: 1.5rem;
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