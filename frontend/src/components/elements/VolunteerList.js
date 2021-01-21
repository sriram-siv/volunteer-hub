import React from 'react'
import styled from 'styled-components'

import UserCard from './UserCard'

const Wrapper = styled.div`
  position: relative;
  overflow-y: scroll;
  width: 100%;
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
    const { title, list, actions } = this.props

    return (
      <Wrapper open show isHidden={isHidden}>
        {title && <Title>{title}</Title>}
        <ListScroll scroll={userShowingDetail === -1}>
          {list && list.map((user, i) => (
            <UserCard
              key={i}
              user={user}
              expanded={user.id === userShowingDetail}
              showDetail={this.showDetail}
              select={actions.selectVolunteer}
            />
          ))}
        </ListScroll>
      </Wrapper>
    )
  }
}

export default VolunteerList