import React from 'react'
import styled from 'styled-components'

import { getSingleCampaign } from '../../lib/api'

import BannerImage from '../elements/BannerImage'
import MultiList from '../elements/MultiList'
import CampaignInfo from '../elements/CampaignInfo'
import NoticeBox from '../elements/NoticeBox'
import AdminPanel from './AdminPanel'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.background};
  position: relative;
  color: ${props => props.theme.text};
  height: calc(100vh - 3rem);
  overflow-y: scroll;
  padding-bottom: 30px;
`

const MainContent = styled.div`
  display: flex;
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
      // Get campaign data and set filtered volunteer list to be all members
      const response = await getSingleCampaign(this.props.match.params.id)
      const campaignData = response.data
      this.setState({ campaignData })
      // Format rooms to be usuable by list component
      const roomItems = campaignData.message_rooms.filter(room => {
        const userID = Number(localStorage.getItem('user_id'))
        return room.members.includes(userID)
      }).map(room => ({ name: room.name, id: room.id, onClick: () => this.openChatRoom(room.id) }))
      const rooms = { title: 'groups', items: roomItems }
      // Format members for the same purpose
      const allMembers = [ campaignData.owner, ...campaignData.coordinators, ...campaignData.conf_volunteers ]
      const memberItems = allMembers.map(volunteer => ({ name: volunteer.username, id: volunteer.id, onClick: () => console.log('user ' + volunteer.username) }))
      const members = { title: 'members', items: memberItems }
      this.setState({ rooms, members })
      this.setState({ admin: this.isAdmin() })
    } catch (err) {
      // Go back a page if user is not authorized to view the page
      console.log(err.response)
      this.props.history.goBack()
    }
  }

  openChatRoom = roomID => {
    this.props.history.push(`/chat/${roomID}`)
  }

  isAdmin = () => {
    const { campaignData } = this.state
    const userId = Number(localStorage.getItem('user_id'))
    const isOwner = campaignData.owner.id === userId
    const isCoord = campaignData.coordinators.includes(userId)
    return isOwner || isCoord
  }

  
  render() {
    
    const multiListStyle = {
      position: 'absolute',
      top: '5px',
      right: '5px'
    }

    const { campaignData, members, rooms, admin } = this.state
    if (!campaignData || !members || !rooms) return null

    return (
      <Wrapper>
        <div>
          <BannerImage />
        </div>
        <MultiList containerStyle={multiListStyle} lists={[members, rooms]}/>
        <MainContent>
          <div style={{ width: '400px', height: '100%', padding: '20px', fontSize: '0.85rem', textAlign: 'justify' }}>
            <CampaignInfo campaignData={campaignData}/>
          </div>
          <div style={{ width: 'calc(100% - 400px)', padding: '20px', paddingLeft: 0 }}>
            <NoticeBox campaignData={campaignData} admin={admin} />
          </div>
        </MainContent>
        {admin && <AdminPanel campaignData={campaignData} />}
      </Wrapper>
    )
  }
}

export default CampaignShow