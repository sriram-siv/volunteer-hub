import React from 'react'
import styled from 'styled-components'

import { confirmVolunteer } from '../../lib/api'

export const MemberDetail = styled.div`
  margin: 5px;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  padding: 5px;
  text-align: center;
`

class PedingList extends React.Component {

  state = {
    campaignData: null
  }

  componentDidMount = () => {
    this.setState({ campaignData: this.props.campaignData })
  }

  confirmVolunteer = async id => {
    console.log(id)
    const response = await confirmVolunteer(this.state.campaignData.id, { volunteer_id: id })
    console.log(response)
  }

  render() {
    const { campaignData } = this.state
    if (!campaignData) return null
    
    return (
      <>
        {campaignData.pend_volunteers.map((volunteer, i) => (
          <MemberDetail key={i} onClick={() => this.confirmVolunteer(volunteer.id)}>{volunteer.username}</MemberDetail>
        ))}
      </>
    )
  }
}

export default PedingList