import React from 'react'

import PendingList from './PendingList'
import ConfirmedList from './ConfirmedList'
import VolunteerList from '../elements/VolunteerList'

class DgTest extends React.Component{


  
  render() {
    const { campaignData } = this.props

    // TODO move functions (confirm pend, etc.) to this level
    
    return (
      <>
        <div style={{ textAlign: 'center' }}>Manage your Volunteers</div>
        <div style={{ width: '500px', margin: 'auto' }}>
          <VolunteerList label="pending" campaignData={campaignData} />
        </div>
        <div>Confirmed List</div>
        <ConfirmedList campaignData={this.props.campaignData} />
      </>
    )
  }
}

export default DgTest