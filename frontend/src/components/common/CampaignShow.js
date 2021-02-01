/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
// import styled from 'styled-components'
// import Select from 'react-select'

import { AppContext } from '../../App'

import { getSingleCampaign, addCampaignNotice, deleteCampaignNotice } from '../../lib/api'
import { selectMenu } from '../../lib/helper'

import Show from './Show'
import CampaignInfo from './CampaignInfo'
import NoticeBoard from '../elements/NoticeBoard'
import CampaignChats from './CampaignChats'
import VolunteersPanel from './VolunteersPanel'
import ChatControl from '../elements/ChatControl'

import Button from '../elements/Button'

const CampaignShow = () => {

  const app = useContext(AppContext)

  const history = useHistory()
  const match = useRouteMatch()

  const address = match.params.section || 'about'

  const [campaignData, setCampaignData] = useState()
  const [rooms, setRooms] = useState([])
  const [isAdmin, setIsAdmin] = useState(null)
  const [noticeInput, setNoticeInput] = useState('')

  const [sections, setSections] = useState([
    ['about', ''], 'notices', 'chats', 'members', 'admin'
  ])

  const getCampaign = async () => {
    try {
      const { data } = await getSingleCampaign(match.params.id)
      const { message_rooms, owner, coordinators } = data

      // This should be filtered on the backend for privacy
      setRooms(message_rooms
        ?.filter(({ members }) => members.includes(app.user)) || [])
    
      // TODO BACKEND This could be set from backend using permission levels
      const userIsAdmin = [owner.id, ...coordinators].includes(app.user)
      setIsAdmin(userIsAdmin)

      const userSections = userIsAdmin
        ? [...sections]
        : sections.filter(section => section !== 'admin')
      
      setSections(userSections)

      if (!userSections.includes(address)) {
        history.push(`/campaigns/${match.params.id}`)
      }

      setCampaignData(data)

    } catch (err) {
      console.error(err)
      // history.goBack()
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

  const editCampaign = () => {
    history.push(`/campaigns/${match.params.id}/edit`)
  }

  const changeSection = ({ value }) => {
    history.push(`/campaigns/${match.params.id}/${value}`)
  }

  const menu = {
    options: sections.map(selectMenu),
    value: selectMenu(address),
    onChange: changeSection
  }


  if (!campaignData) return null

  return <>
    <Show title={campaignData.name} menu={menu}>

      {{ // switch on address value

        about:
          <CampaignInfo campaignData={campaignData} />,

        notices:
          <NoticeBoard campaignData={campaignData} isAdmin={isAdmin} deleteNotice={deleteNotice} />,

        members:
          <VolunteersPanel updateData={getCampaign} campaignData={campaignData} isAdmin={isAdmin} />,

        chats:
          <CampaignChats rooms={rooms} />,

        admin:
          <Button onClick={editCampaign}>edit campaign</Button>

      }[address]}

      {/* {address === 'about' &&
        campaignData.description.split('\n').map((para, i) => <p key={i}>{para}</p>)}

      {address === 'notices' &&
        <NoticeBoard campaignData={campaignData} isAdmin={isAdmin} deleteNotice={deleteNotice} />}

      {address === 'members' &&
        <VolunteersPanel campaignData={campaignData} isAdmin={isAdmin} />}

      {address === 'chats' &&
        rooms.map((room, i) => <RoomCard key={i} room={room} />)}

      {address === 'admin' &&
        <Button onClick={editCampaign}>edit campaign</Button>} */}

    </Show>

    {address === 'notices' &&
      <div style={{ position: 'absolute', bottom: 0, zIndex: 5, width: '100%', paddingLeft: '10px', paddingRight: '13px' }}>
        <ChatControl value={noticeInput} handleChange={updateNoticeInput} send={postNotice} />
      </div>
    }
  </>
}

export default CampaignShow