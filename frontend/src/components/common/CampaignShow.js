/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
// import styled from 'styled-components'
// import Select from 'react-select'

import { getSingleCampaign, addCampaignNotice, deleteCampaignNotice } from '../../lib/api'
import { selectMenu } from '../../lib/helper'

import Show from './Show'
import NoticeBoard from '../elements/NoticeBoard'
import VolunteersPanel from './VolunteersPanel'
import ChatControl from '../elements/ChatControl'

import RoomCard from '../elements/RoomCard'

const CampaignShow = () => {

  const history = useHistory()
  const match = useRouteMatch()

  const [campaignData, setCampaignData] = useState()
  const [rooms, setRooms] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [section, setSection] = useState(selectMenu('about'))
  const [noticeInput, setNoticeInput] = useState('')

  const getCampaign = async () => {
    try {
      const { data } = await getSingleCampaign(match.params.id)
      const { message_rooms, owner, coordinators } = data
      
      const userID = Number(localStorage.getItem('user_id'))

      // This should be filtered on the backend for privacy
      setRooms(message_rooms
        .filter(({ members }) => members.includes(userID)))
      // This could be set from backend using permission levels
      setIsAdmin([owner.id, ...coordinators].includes(userID))

      setCampaignData(data)

    } catch (err) {
      history.goBack()
    }
  }

  // onMount
  useEffect(getCampaign, [])

  const updateNoticeInput = event => {
    setNoticeInput(event.target.value)
  }

  const postNotice = async event => {
    event.preventDefault()
    try {
      const newNotice = {
        text: noticeInput,
        campaign: campaignData.id
      }
      const { data } = await addCampaignNotice(newNotice)
      // TODO BACKEND return full owner info in response
      const notices = [...campaignData.campaign_notices, data]
      setNoticeInput('')
      setCampaignData({ ...campaignData, campaign_notices: notices })
    } catch (err) {
      console.log(err)
    }
  }

  const deleteNotice = async event => {
    try {
      const noticeID = Number(event.target.id)
      await deleteCampaignNotice(noticeID)
      const notices = campaignData.campaign_notices.filter(({ id }) => id !== noticeID)
      setCampaignData({ ...campaignData, campaign_notices: notices })
    } catch (err) {
      console.log(err.response.data)
    }
  }

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

  // if (isAdmin) menu.options.push(selectMenu('admin'))

  // if (menu.options.some(opt => opt.value === hash) && section.value !== hash) {
  //   setSection({ label: hash, value: hash })
  // }

  if (!campaignData) return null

  return <>
    <Show title={campaignData.name} menu={menu}>
      {section.label === 'about' &&
        campaignData.description.split('\n').map((para, i) => <p key={i}>{para}</p>)}
      {section.label === 'notices' &&
        <NoticeBoard campaignData={campaignData} isAdmin={isAdmin} deleteNotice={deleteNotice} />}
      {section.label === 'members' &&
        <VolunteersPanel campaignData={campaignData} isAdmin={isAdmin} />}
      {section.label === 'chats' &&
        rooms.map((room, i) => <RoomCard key={i} room={room} />)}
      {/* rooms.map((room, i) => <p key={i}>{room.name}</p>)} */}
    </Show>
    {section.label === 'notices' &&
      <div style={{ position: 'absolute', bottom: 0, left: '10px', zIndex: 5, width: 'calc(100% - 23px)' }}>
        <ChatControl value={noticeInput} handleChange={updateNoticeInput} send={postNotice} />
      </div>}
  </>
}

export default CampaignShow