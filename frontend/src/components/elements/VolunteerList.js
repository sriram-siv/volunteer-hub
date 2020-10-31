import React from 'react'
import styled, { withTheme } from 'styled-components'

import icons from '../../lib/icons'
import UserCard from './UserCard'

const Wrapper = styled.div`
  position: relative;
  overflow-y: hidden;
  width: 100%;
  height: ${props => {
    if (props.open) return '100%'
    if (props.show) return '45px'
    return 0
  }};
  margin-bottom: ${props => props.show && !props.open ? '5px' : 0};
  opacity: ${props => props.show ? 1 : 0};
  background-color: ${props => `${props.theme.background}e`};
  border-radius: 2px;
  border-width: ${props => props.show ? '1px' : 0};
  border-style: solid;
  border-color: ${props => props.theme.shadow};
  transition: all 0.2s;
`

const ListScroll = styled.div`
  position: relative;
  margin-top: 10px;
  height: calc(100% - 50px);
  overflow-y: scroll;
`

const Title = styled.div`
  text-align: left;
  line-height: 30px;
  padding-top: 5px;
  padding-left: 10px;
  color: ${props => props.theme.text};
  font-size: 1rem;
  font-weight: ${props => props.theme.fontWeight};
  ::selection {
    background-color: transparent;
  }
  `

const Toggle = styled.div`
  position: absolute;
  top: 7px;
  right: 15px;
  transform: rotateZ(${props => props.isHidden ? '0deg' : '90deg'});
  transition: all 0.2s;
`

class VolunteerList extends React.Component {

  state = {
    isHidden: true,
    userShowingDetail: -1
  }

  toggleView = () => {
    this.setState({ isHidden: !this.state.isHidden })
    this.props.onToggle(this.props.list.label)
  }

  showDetail = id => {
    const userShowingDetail = this.state.userShowingDetail === id ? -1 : id
    this.setState({ userShowingDetail })
  }

  render() {
    const { isHidden, userShowingDetail } = this.state
    const { list, actions, theme, openList } = this.props
    
    const open = openList === list.label
    const show = !openList || open

    return (
      <Wrapper open={open} show={show} isHidden={isHidden}>
        <Toggle isHidden={isHidden} onClick={this.toggleView}>{icons.right(theme.text)}</Toggle>
        <Title>{list.label}</Title>
        <ListScroll scroll={userShowingDetail === -1}>
          {list.users && list.users.map((user, i) => (
            <UserCard
              key={i}
              user={user}
              expanded={user.id === userShowingDetail}
              showDetail={this.showDetail}
              select={list.label === 'volunteers' && actions.selectVolunteer}
              confirm={list.label === 'pending' && actions.confirmVolunteer}
              deny={list.label === 'pending' && actions.denyVolunteer}
            />
          ))}
        </ListScroll>
      </Wrapper>
    )
  }
}

export default withTheme(VolunteerList)