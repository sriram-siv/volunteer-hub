import React from 'react'
import styled, { withTheme } from 'styled-components'

import Select, { components } from 'react-select'

import { getSingleCampaign } from '../../lib/api'

import BannerImage from '../elements/BannerImage'
import NoticeBox from '../elements/NoticeBox'
// import AdminPanel from './AdminPanel'

const Wrapper = styled.div`
  position: relative;
  height: calc(100vh - 3rem);
  overflow-y: scroll;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`

class ShowTest extends React.Component {

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
      // const response = await getSingleCampaign(this.props.match.params.id)
      const response = await getSingleCampaign(1)
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

  editCampaign = () => {
    this.props.history.push(`/campaigns/${this.state.campaignData.id}/edit`)
  }

  changeSection = section => {
    this.setState({ section })
  }

  
  render() {
    
    const { campaignData, members, rooms, section } = this.state
    if (!campaignData || !members || !rooms) return null

    const menu = [
      { label: 'about', value: 'about' },
      { label: 'notices', value: 'notices' },
      { label: 'chats', value: 'chats' },
      { label: 'members', value: 'members' },
      { label: 'admin', value: 'admin' }
    ]

    const Panel = styled.div`
      position: relative;
      top: calc(250px - 3rem);
      left: 10px;
      width: calc(100vw - 23px);
      height: calc(100vh - 3rem - 20px);
      background-color: #eeed;
      /* background: linear-gradient(0deg, #fffa, #fffc); */
      border-radius: 3px;
      margin-bottom: 10px;
      backdrop-filter: blur(4px);
    `

    const Title = styled.h2`
      font-size: 1.1rem;
      /* background-color: #ff08; */
      background-color: ${props => props.theme.primary};
      color: #333;
      padding: 12px 20px;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      height: 3rem;
    `

    const SelectWrapper = styled.div`
      position: absolute;
      top: 5px;
      right: 5px;
      width: 9rem;
    `

    const Body = styled.div`
      height: calc(100vh - 6rem - 20px);
      padding: 20px;
      margin-top: -8px;
      border: 1px solid lightgrey;
      border-top-width: 0;
      border-radius: 3px;
    `

    const selectStyles = {
      control: styles => ({
        ...styles,
        backgroundColor: this.props.theme.background,
        borderRadius: '2px',
        borderColor: this.props.theme.shadow,
        height: 'calc(2rem)'
      }),
      singleValue: styles => ({
        ...styles,
        color: this.props.theme.text,
        fontWeight: this.props.theme.fontWeight,
        letterSpacing: this.props.theme.letterSpacing,
        left: '50%',
        transform: 'translate(calc(-50% + 1rem), -50%)'
      }),
      menu: styles => ({
        ...styles,
        backgroundColor: this.props.theme.background,
        color: this.props.theme.text,
        borderRadius: '2px',
        textAlign: 'center'
      }),
      indicatorSeparator: () => ({ width: 0 })
    }

    return (
      <Wrapper>
        <div style={{ position: 'fixed', top: '3rem', width: 'calc(100% - 3px)', pointerEvents: 'none' }} >
          <BannerImage />
        </div>

        <Panel className="panel">
          <Title>{campaignData.name}</Title>
          <SelectWrapper>
            <Select styles={selectStyles} options={menu} value={section} onChange={this.changeSection} isSearchable={false} />
          </SelectWrapper>
          <Body>
            {section.label === 'about' && campaignData.description.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {section.label === 'notices' && <NoticeBox campaignData={campaignData} admin={true} />}
          </Body>
        </Panel>

      </Wrapper>
    )
  }
}

export default withTheme(ShowTest)