/* eslint-disable camelcase */
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  padding-bottom: calc(4rem + 30px);
  /* overflow-x: hidden; */
`

const NoticeText = styled.div`
  position: relative;
  margin: 5px;
  margin-right: 2px;
  padding: 15px;
  padding-bottom: calc(15px + 1rem);
  background-color: ${props => props.theme.background};
  /* font-style: italic; */
  color: ${props => props.theme.text};
  box-shadow: 0 0 2px #555a;
`

const NoticeDelete = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 0.7rem;
  padding-top: 9px;
  color: red;
  cursor: pointer;
`

const User = styled.div`
  position: absolute;
  right: calc(10px + 3rem);
  bottom: 10px;
  font-size: 0.7rem;
  padding-top: 10px;
  color: ${props => props.theme.text};
`

const NoticeBoard = ({ campaignData, isAdmin, deleteNotice }) => {

  const formatDate = date => (
    `${date.toDateString()} ${date.toLocaleTimeString()}`
  )

  return (
    <Wrapper>
      {campaignData.campaign_notices.map(({ id, owner, text, time_stamp }) => (
        <NoticeText key={id}>
          {text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
          <User>{`${formatDate(new Date(time_stamp))} - ${owner.username}`}</User>
          {isAdmin && <NoticeDelete id={id} onClick={deleteNotice}>delete</NoticeDelete>}
        </NoticeText>
      ))}
    </Wrapper>
  )

}

export default NoticeBoard
