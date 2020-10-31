import React from 'react'
import styled from 'styled-components'

import VolunteerList from './VolunteerList'

import { confirmVolunteer, removeVolunteer } from '../../lib/api'


const Wrapper = styled.div`
  overflow-y: hidden;
  position: relative;
  margin-bottom: ${props => props.show && !props.open ? '5px' : 0};
  transition: all 0.3s;
  height: ${props => {
    if (props.open) return '100%'
    if (props.show) return '45px'
    return 0
  }};
  opacity: ${props => props.show ? 1 : 0};
`

class MultiListVolunteer extends React.Component {

  state = {
    openList: ''
  }

  onListToggle = listName => {
    const openList = this.state.openList === listName ? '' : listName
    this.setState({ openList })
  }

  selectVolunteer = volunteerID => {
    this.props.selectVolunteer(volunteerID)
  }

  confirmVolunteer = async (volunteerID) => {
    const response = await confirmVolunteer(this.props.campaignData.id, volunteerID)
    return response.status
  }

  denyVolunteer = async volunteerID => {
    try {
      const response = await removeVolunteer(this.props.campaignData.id, volunteerID)
      return response.status
    } catch (err) {
      console.log({ err } )
    }
  }

  volunteerActions = {
    selectVolunteer: this.selectVolunteer,
    confirmVolunteer: this.confirmVolunteer,
    denyVolunteer: this.denyVolunteer
  }

  render() {
    const { openList } = this.state
    const { campaignData, filteredVolunteers } = this.props

    return (
      <div style={{ height: '100%' }}>
        <Wrapper show={!openList || openList === 'pending'} open={openList === 'pending' } >
          <VolunteerList actions={this.volunteerActions} label="pending" campaignID={campaignData.id} users={campaignData.pend_volunteers} onToggle={() => this.onListToggle('pending')} />
        </Wrapper>
        <Wrapper show={!openList || openList === 'volunteers'} open={openList === 'volunteers' } >
          <VolunteerList actions={this.volunteerActions} label="volunteers" campaignData={campaignData} users={filteredVolunteers} onToggle={() => this.onListToggle('volunteers')} />
        </Wrapper>
      </div>
    )
  }
}

export default MultiListVolunteer