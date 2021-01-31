import React from 'react'

import RoomCard from '../elements/RoomCard'

const CampaignChats = ({ rooms }) => {
  return rooms.map((room, i) => <RoomCard key={i} room={room} />)
}

export default CampaignChats