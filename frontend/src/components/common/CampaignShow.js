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
    rooms: null
  }
  
  componentDidMount = async () => {
    const response = await getSingleCampaign(this.props.match.params.id)
    this.setState({ campaignData: response.data })
    console.log(response.data.message_rooms)

    const rooms = response.data.message_rooms.map(room => {
      console.log(room)
    })
  }

  render() {

    // Might be more flexible if we passed in an array of the item components
    const members = 
      { title: 'members', items: ['sri', 'don', 'charlotte', 'jack'] }
    const groups = 
      { title: 'groups', items: [ 'coordinators', 'team', 'Don' ] }
    
    const multiListStyle = {
      position: 'absolute',
      top: 'calc(3rem + 5px)',
      right: '5px'
    }

    const { campaignData } = this.state

    if (!campaignData) return null

    return (
      <Wrapper>
        <BannerImage />
        <MultiList containerStyle={multiListStyle} lists={[members, groups]} />
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