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

const Title = styled.div`
  padding: 10px;
  font-size: 1rem;
`

class PendingList extends React.Component {

  state = {
    campaignID: null,
    pending: null
  }

  componentDidMount = () => {
    const { id, pend_volunteers: pending } = this.props.campaignData
    this.setState({ id, pending })
  }

  confirmVolunteer = async volunteerID => {
    const response = await confirmVolunteer(this.state.id, { volunteer_id: volunteerID })
    const pending = this.state.pending.filter(volunteer => volunteer.id !== volunteerID)
    console.log(response)
    this.setState({ pending })
  }

  render() {
    const { pending } = this.state
    if (!pending) return null
    
    return (
      <>
        <Title>Pending Volunteers</Title>
        {pending.map((volunteer, i) => (
          <MemberDetail key={i} onClick={() => this.confirmVolunteer(volunteer.id)}>
            {volunteer.username}
          </MemberDetail>
        ))}
      </>
    )
  }
}

export default PendingList
