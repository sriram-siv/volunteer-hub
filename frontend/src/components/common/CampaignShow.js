import React from 'react'
import styled from 'styled-components'

import BannerImage from '../elements/BannerImage'
import MultiList from '../elements/MultiList'

import DgTest from '../common/DgTest'
import NoticeBox from '../common/NoticeBox'


import { getSingleCampaign } from '../../lib/api'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  min-height: calc(100vh - 3rem);
`

class CampaignShow extends React.Component {

  state = {
    campaignData: null,
    members: null,
    rooms: null,
    admin: false
  }
  
  componentDidMount = () => {
    this.getCampaign()
  }

  componentDidUpdate = prevProps => {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getCampaign()
    }
  }

  getCampaign = async () => {
    try {
      const response = await getSingleCampaign(this.props.match.params.id)
      this.setState({ campaignData: response.data })
      console.log(response.data)
  
      const roomItems = response.data.message_rooms.filter(room => {
        const userID = Number(localStorage.getItem('user_id'))
        return room.members.includes(userID)
      }).map(room => ({ name: room.name, id: room.id, onClick: () => this.openChatRoom(room.id) }))
      const rooms = { title: 'groups', items: roomItems }
  
      const memberItems = response.data.conf_volunteers.map(volunteer => ({ name: volunteer.username, id: volunteer.id, onClick: () => console.log('user ' + volunteer.username) }))
      const members = { title: 'members', items: memberItems }
      this.setState({ rooms, members })
    } catch (err) {
      console.log(err.response)
      this.props.history.goBack()
    }
    this.setState({ admin: this.isAdmin() })
  }

  openChatRoom = roomID => {
    this.props.history.push(`/chat/${roomID}`)
  }

  isAdmin = () => {
    if (this.state.campaignData) {
      const userId = Number(localStorage.getItem('user_id'))
      const isOwner = this.state.campaignData.owner.id === userId
      const isCoord = this.state.campaignData.coordinators.includes(userId)
      return (isOwner || isCoord)
    }
  }


  render() {
    
    
    const multiListStyle = {
      position: 'absolute',
      top: 'calc(3rem + 5px)',
      right: '5px'
    }

    const { campaignData, members, rooms, admin } = this.state

    if (!campaignData || !members || !rooms ) return null

    return (
      <Wrapper>
        <BannerImage />
        <MultiList containerStyle={multiListStyle} lists={[members, rooms]} />
        <div style={{ display: 'flex' }}>
          <div style={{ width: '600px', padding: '20px', fontSize: '0.85rem', textAlign: 'justify' }}>{campaignData.description}</div>          
          {/* <div style={{ width: '100%', margin: '10px', padding: '20px', border: '2px solid #fef715', backgroundColor: '#aeb4ba', color: '#333', textAlign: 'center' }}></div> */}
          <NoticeBox campaignData={campaignData} admin={admin} />
        </div>
        {admin && <DgTest campaignData={campaignData}/>}
      </Wrapper>
    )
  }
}

export default CampaignShow