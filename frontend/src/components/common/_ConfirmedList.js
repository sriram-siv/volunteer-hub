import React from 'react'

import { MemberDetail } from './PendingList'

class ConfirmedList extends React.Component{
  
  state = {
    campaignData: null
  }

  componentDidMount = () => {
    this.setState({ campaignData: this.props.campaignData })
  }

  render () {
    const { campaignData } = this.state
    if (!campaignData) return null

    return (
      <>
        {campaignData.conf_volunteers.map((volunteer, i) => (
          <MemberDetail key={i}>{volunteer.username}</MemberDetail>
        ))}
      </>
    )
  }
}

export default ConfirmedList