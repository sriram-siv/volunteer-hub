import React from 'react'
import PendingList from './PendingList'
import ConfirmedList from './ConfirmedList'

class DgTest extends React.Component{

  
  render() {
    
    return (
      <>
        <div>Manage your Volunteers</div>
        <div>Pending List</div>
        <PendingList campaignData={this.props.campaignData} />
        <div>Confirmed List</div>
        <ConfirmedList campaignData={this.props.campaignData} />
      </>
    )
  }
}

export default DgTest