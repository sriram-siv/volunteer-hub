import React from 'react'
import styled, { withTheme } from 'styled-components'

import icons from '../../lib/icons'

import UserCard from './UserCard'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${props => `${props.theme.background}e`};
  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  overflow-y: hidden;
  transition: all 0.2s;
`

const ListScroll = styled.div`
  position: relative;
  margin-top: 35px;
  height: calc(100% - 75px);
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
    id: null,
    users: null,
    isHidden: true,
    userShowingDetail: -1
  }

  componentDidMount = () => {
    const { campaignID: id, users } = this.props
    this.setState({ id, users })
  }

  componentDidUpdate = () => {
    if (this.props.users.length !== this.state.users.length) this.setState({ users: this.props.users })
  }

  toggleView = () => {
    this.setState({ isHidden: !this.state.isHidden })
    this.props.onToggle()
  }

  showDetail = id => {
    const userShowingDetail = this.state.userShowingDetail === id ? -1 : id
    this.setState({ userShowingDetail })
  }

  confirmVolunteer = async volunteerID => {
    // API call happens in the parent component
    const status = await this.props.actions.confirmVolunteer(volunteerID)
    if (status !== 202) return
    // Only alter list on a successful PUT request
    const users = this.state.users.filter(volunteer => volunteer.id !== volunteerID)
    this.setState({ users })
  }

  denyVolunteer = async volunteerID => {
    // API call happens in the parent component
    const status = await this.props.actions.denyVolunteer(volunteerID)
    if (status !== 202) return
    // Only alter list on a successful PUT request
    const users = this.state.users.filter(volunteer => volunteer.id !== volunteerID)
    this.setState({ users })
  }


  render() {
    const { isHidden, userShowingDetail, users } = this.state
    const { label } = this.props

    return (
      <Wrapper isHidden={isHidden}>
        <Toggle isHidden={isHidden} onClick={this.toggleView}>{icons.right(this.props.theme.text)}</Toggle>
        <Title>{label}</Title>
        <ListScroll scroll={userShowingDetail === -1}>
          {users && users.map((user, i) => {
            const expanded = user.id === userShowingDetail
            return (
              <UserCard
                key={i}
                user={user}
                expanded={expanded}
                showDetail={this.showDetail}
                select={label === 'volunteers' && this.props.actions.selectVolunteer}
                confirm={label === 'pending' && this.confirmVolunteer}
                deny={label === 'pending' && this.denyVolunteer}
              />
            )
          })}
        </ListScroll>
      </Wrapper>
    )
  }
}

export default withTheme(VolunteerList)