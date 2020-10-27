import React from 'react'
import styled from 'styled-components'

import { addCampaignNotice } from '../../lib/api'

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

const NoticeText = styled.p`
  width: 80%;
  font-style: italic;
  margin: 0;
  padding: 5px;
`

const NoticeForm = styled.form`
  display: flex;
`

class NoticeBox extends React.Component {
  
  state = {
    campaignData: null,
    noticeText: ''
  }

  componentDidMount = () => {
    this.setState({ campaignData: this.props.campaignData })
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
      console.log(response)
      this.setState({ noticeText: '' })
    } catch (err) {
      console.log(err.response.data)
    }
  }

  render () {
    const { campaignData, noticeText } = this.state
    if (!campaignData) return null

    return (
      <Wrapper>
        <NoticeContain>
          { campaignData.campaign_notices.map(notice => (
            <NoticeText key={notice.id}>{notice.text}</NoticeText>
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
