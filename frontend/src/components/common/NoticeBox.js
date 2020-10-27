import React from 'react'
import styled from 'styled-components'

import { addCampaignNotice, deleteCampaignNotice } from '../../lib/api'

import Button from '../elements/Button'
import InputArea from '../elements/InputArea'

const Wrapper = styled.div`
  width: 100%;
  margin: '10px';
  padding: '20px';
  border: '2px solid #fef715';
  background-color: '#aeb4ba';
  color: '#333';
  text-align: 'center';
`

const NoticeContain = styled.div`
  border: 1px solid yellow;
  overflow-y: scroll;
  height: 100px;
`

const NoticeText = styled.div`
  width: 80%;
  font-style: italic;
  margin: 0;
  padding: 5px;
`

const NoticeDelete = styled.div`
  display: inline;
  font-size: 10px;
  color: red;
`

const NoticeForm = styled.form`
  display: flex;
`

class NoticeBox extends React.Component {
  
  state = {
    campaignData: null,
    noticeText: '',
    notices: null
  }

  componentDidMount = () => {
    const campaignData = {...this.props.campaignData}
    const notices = [...campaignData.campaign_notices]
    this.setState({ campaignData, notices })
  }

  handleChange = event => {
    const noticeText = event.target.value
    this.setState({ noticeText })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const newNotice = {
        text: this.state.noticeText,
        campaign: this.state.campaignData.id
      }
      const response = await addCampaignNotice(newNotice)
      const notices = [...this.state.notices]
      notices.push(response.data)
      this.setState({ noticeText: '', notices })
    } catch (err) {
      console.log(err.response.data)
    }
  }

  handleDelete = async event => {
    try {
      const response = await deleteCampaignNotice(event.target.id)
      let notices = [...this.state.notices]
      console.log('notices before filter: ', notices)
      console.log('id: ', event.target.id)
      notices = notices.filter(notice => notice.id != event.target.id)
      console.log('notices after filter: ', notices)
      this.setState({ notices })
    } catch (err) {
      console.log(err.response.data)
    }
  }

  render () {
    const { campaignData, noticeText, notices } = this.state
    if (!campaignData) return null

    return (
      <Wrapper>
        <NoticeContain>
          { notices.map(notice => (
            <NoticeText key={notice.id}>{notice.text} {this.props.admin && <NoticeDelete id={notice.id} onClick={this.handleDelete} >delete</NoticeDelete>}</NoticeText>
          )) }
        </NoticeContain>
        {this.props.admin &&
          <NoticeForm><InputArea width='60%' name='textArea' value={noticeText} returnValue={this.handleChange}/>
            <Button width='10%' label='POST' onClick={this.handleSubmit}/>
          </NoticeForm>}
      </Wrapper>
    )
  }
}

export default NoticeBox
