import React from 'react'
import styled from 'styled-components'

import BannerImage from '../elements/BannerImage'
import MultiList from '../elements/MultiList'
import NoticeBox from '../common/NoticeBox'
import MultiListVolunteer from '../elements/MultiListVolunteers'
import CampaignInfo from '../elements/CampaignInfo'
import FilterVolunteers from '../elements/FilterVolunteers'

import { getSingleCampaign } from '../../lib/api'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  /* min-height: calc(100vh - 3rem); */
  position: relative;
  height: calc(100vh - 3rem);
  overflow-y: scroll;
`

const MainContent = styled.div`
  display: flex;
`

const AdminPanel = styled.div`
  display: ${props => props.show ? 'flex' : 'none'};
`

class CampaignShow extends React.Component {

  state = {
    campaignData: null,
    filteredVolunteers: null,
    members: null,
    rooms: null,
    admin: false,
    schedule: Array.from({ length: 14 }).fill(false)
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
      const allMembers = [ response.data.owner, ...response.data.coordinators, ...response.data.conf_volunteers ]
      this.setState({ campaignData: response.data, filteredVolunteers: allMembers })
      // Format rooms to be usuable by list component
      const roomItems = response.data.message_rooms.filter(room => {
        const userID = Number(localStorage.getItem('user_id'))
        return room.members.includes(userID)
      }).map(room => ({ name: room.name, id: room.id, onClick: () => this.openChatRoom(room.id) }))
      const rooms = { title: 'groups', items: roomItems }
      // Format members for the same purpose
      const memberItems = allMembers.map(volunteer => ({ name: volunteer.username, id: volunteer.id, onClick: () => console.log('user ' + volunteer.username) }))
      const members = { title: 'members', items: memberItems }
      this.setState({ rooms, members })
    } catch (err) {
      // Go back a page if user is not authorized to view the page
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

  selectSchedule = slot => {
    const schedule = [...this.state.schedule]
    schedule[slot] = !schedule[slot]
    this.setState({ schedule }, this.filterVolunteers)
  }

  selectSkills = e => {
    console.log(e)
  }

  filterVolunteers = () => {
    const { schedule } = this.state
    console.log(schedule)
    const filteredVolunteers = [ this.state.campaignData.owner, ...this.state.campaignData.coordinators, ...this.state.campaignData.conf_volunteers ]
      .filter(member => member.user_shifts.some(shift => schedule[shift.id - 1]) || schedule.every(slot => !slot))
    this.setState({ filteredVolunteers })

  }


  render() {
    
    
    const multiListStyle = {
      position: 'absolute',
      top: '5px',
      right: '5px'
    }

    const { campaignData, members, rooms, admin, schedule, filteredVolunteers } = this.state

    if (!campaignData || !members || !rooms) return null

    return (
      <Wrapper>
        <div>
          <BannerImage />
        </div>
        <MultiList containerStyle={multiListStyle} lists={[members, rooms]} />
        <MainContent>
          <div style={{ width: '400px', height: '100%', padding: '20px', fontSize: '0.85rem', textAlign: 'justify' }}>
            <CampaignInfo campaignData={campaignData}/>
          </div>
          <div style={{ width: 'calc(100% - 400px)', padding: '20px', paddingLeft: 0 }}>
            <NoticeBox campaignData={campaignData} admin={admin} />
          </div>
        </MainContent>
        <AdminPanel show={admin}>
          <div style={{ width: '400px', padding: '20px' }}>
            <MultiListVolunteer campaignData={campaignData} filteredVolunteers={filteredVolunteers} containerStyle={{ height: '600px' }}/>
          </div>
          <div style={{ width: 'calc(100% - 400px)', padding: '20px', paddingLeft: 0 }}>
            <FilterVolunteers schedule={schedule} selectSchedule={this.selectSchedule} selectSkills={this.selectSkills}  />
          </div>
        </AdminPanel>
      </Wrapper>
    )
  }
}

export default CampaignShow