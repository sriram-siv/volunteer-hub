import React from 'react'
// import styled from 'styled-components'
// import Select from 'react-select'

import { getSingleCampaign } from '../../lib/api'

import Show from './Show'
import NoticeBox from '../elements/NoticeBox'
// import AdminPanel from './AdminPanel'

class CampaignShow extends React.Component {

  state = {
    campaignData: null,
    members: null,
    rooms: null,
    admin: false,

    section: { label: 'about', value: 'about' }
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
      const { data: campaignData } = await getSingleCampaign(this.props.match.params.id)

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

      
      
      this.setState({ campaignData, rooms, members, admin: this.isAdmin(campaignData) })
    } catch (err) {
      // Go back a page if user is not authorized to view the page
      console.log(err.response)
      this.props.history.goBack()
    }
  }

  openChatRoom = roomID => {
    this.props.history.push(`/chat/${roomID}`)
  }

  isAdmin = ({ owner, coordinators }) => {
    const userId = Number(localStorage.getItem('user_id'))
    const isOwner = owner.id === userId
    const isCoord = coordinators.includes(userId)
    return isOwner || isCoord
  }

  editCampaign = () => {
    this.props.history.push(`/campaigns/${this.state.campaignData.id}/edit`)
  }

  changeSection = section => {
    this.setState({ section })
  }

  
  render() {
    
    const { campaignData, members, rooms, section } = this.state
    if (!campaignData) return null

    const menu = {
      options: [
        { label: 'about', value: 'about' },
        { label: 'notices', value: 'notices' },
        { label: 'chats', value: 'chats' },
        { label: 'members', value: 'members' },
        { label: 'admin', value: 'admin' }
      ],
      value: section,
      onChange: this.changeSection
    }

    return (

      <Show
        title={campaignData.name}
        menu={menu}
        // banner
      >
        {section.label === 'about' && campaignData.description.split('\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        {section.label === 'notices' && <NoticeBox campaignData={campaignData} admin={true} />}
      </Show>
    )
  }
}

export default CampaignShow