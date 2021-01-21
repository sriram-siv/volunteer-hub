/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import Select from 'react-select'

import { getSingleCampaign } from '../../lib/api'
import { selectMenu } from '../../lib/helper'

import Show from './Show'
import NoticeBox from '../elements/NoticeBox'
import UserCard from '../elements/UserCard'
import VolunteersPanel from './VolunteersPanel'
import AdminPanel from './AdminPanel'

const CampaignShow = ({ history, match }) => {

  const [campaignData, setCampaignData] = useState()
  const [members, setMembers] = useState([])
  const [rooms, setRooms] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [section, setSection] = useState(selectMenu('about'))

  const getCampaign = async () => {
    try {
      const { data } = await getSingleCampaign(match.params.id)
      const { message_rooms, owner, coordinators, conf_volunteers } = data
      
      const userID = Number(localStorage.getItem('user_id'))

      // This should be filtered on the backend for privacy
      setRooms(message_rooms
        .filter(({ members }) => members.includes(userID)))

      setMembers([owner, ...coordinators, ...conf_volunteers])
      
      setIsAdmin([owner.id, ...coordinators].includes(userID))

      setCampaignData(data)
    } catch (err) {
      history.goBack()
    }
  }

  // onMount
  useEffect(getCampaign, [])

  // const openChatRoom = roomID => {
  //   history.push(`/chat/${roomID}`)
  // }

  // const editCampaign = () => {
  //   history.push(`/campaigns/${campaignData.id}/edit`)
  // }

  // const hash = history.location.hash.replace('#', '')

  const menu = {
    options: ['about', 'notices', 'chats', 'members'].map(selectMenu),
    value: section,
    onChange: setSection
  }

  if (isAdmin) menu.options.push(selectMenu('admin'))

  // if (menu.options.some(opt => opt.value === hash) && section.value !== hash) {
  //   setSection({ label: hash, value: hash })
  // }

  if (!campaignData) return null

  // Can there be a subrouter here?

  return (
    <Show title={campaignData.name} menu={menu}>
      {section.label === 'about' &&
        campaignData.description.split('\n').map((para, i) => <p key={i}>{para}</p>)}
      {section.label === 'notices' &&
        <NoticeBox campaignData={campaignData} admin={isAdmin} />}
      {section.label === 'members' &&
        <VolunteersPanel campaignData={campaignData} isAdmin={isAdmin} />}
      {section.label === 'chats' &&
        rooms.map((room, i) => <p key={i}>{room.name}</p>)}
      {section.label === 'admin' &&
        <AdminPanel campaignData={campaignData} />}
    </Show>
  )
}

export default CampaignShow