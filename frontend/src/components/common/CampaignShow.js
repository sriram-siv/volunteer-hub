import React from 'react'
import styled from 'styled-components'

import BannerImage from '../elements/BannerImage'
import MultiList from '../elements/MultiList'

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
    rooms: null
  }
  
  componentDidMount = async () => {
    try {
      const response = await getSingleCampaign(this.props.match.params.id)
      this.setState({ campaignData: response.data })
      console.log(response.data)
  
      let items = response.data.message_rooms.filter(room => {
        const userID = Number(localStorage.getItem('user_id'))
        return room.members.includes(userID)
      }).map(room => room.name)
      const rooms = { title: 'groups', items }
  
      items = response.data.conf_volunteers.map(volunteer => volunteer.username)
      const members = { title: 'members', items }
      this.setState({ rooms, members })
    } catch (err) {
      console.log(err.response)
      this.props.history.goBack()
    }
  }

  render() {
    
    
    const multiListStyle = {
      position: 'absolute',
      top: 'calc(3rem + 5px)',
      right: '5px'
    }

    const { campaignData, members, rooms } = this.state

    if (!campaignData || !members || !rooms ) return null

    return (
      <Wrapper>
        <BannerImage />
        <MultiList containerStyle={multiListStyle} lists={[members, rooms]} />
        <div style={{ display: 'flex' }}>
          <div style={{ width: '600px', padding: '20px', fontSize: '0.85rem', textAlign: 'justify' }}>{campaignData.description}</div>          
          <div style={{ width: '100%', margin: '10px', padding: '20px', border: '2px solid #fef715', backgroundColor: '#aeb4ba', color: '#333', textAlign: 'center' }}>
            Notices
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default CampaignShow