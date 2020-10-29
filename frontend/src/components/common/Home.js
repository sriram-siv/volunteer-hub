import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { SplitContain, SplitRow, SplitTitle, SplitImg, SplitBrk } from '../elements/Split'
import Button from '../elements/Button'

import campaigns from '../../images/campaigns.jpg'
import campPreview from '../../images/campPreview.jpg'
import chatgif from '../../gif/chatgif.gif'

const Hero = styled.div`
  display: flex;
  height: 75vh;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-family: 'Montserrat Alternates', sans-serif;
`

class Home extends React.Component {

  componentDidMount = () => {
    const userId = localStorage.getItem('user_id')
    if (userId) this.props.history.push('/profile')
  }

  render() {

    const width = '30%'

    return (
      <>
        <Hero>Welcome to Volunteer.io</Hero>
        <SplitContain>
          <SplitRow>
            <div>
              <SplitTitle>Find a Campaign</SplitTitle>
              <p>
                Browse the best volunteer opportunities near you and even match with those looking for someone with your skills. Your community needs your help, what are you waiting for?
              </p>
              <Link to='/campaigns' style={{ textDecoration: 'none' }} ><Button width={width} label='Search Campaigns'/></Link>
            </div>
            <div>
              <SplitImg src={campaigns} alt='' />
            </div>
          </SplitRow>
          <SplitBrk/>
          <SplitRow>
            <div>
              <SplitImg src={campPreview} alt=''/>
            </div>
            <div>
              <SplitTitle>Manage a Campaign</SplitTitle>
              <p>
              Do you know of someone or a project in need of a few helping hands? Get a qualified team together and you can start making a difference today by starting and managing a campaign.
              </p>
              <Link to='/campaigns/new' style={{ textDecoration: 'none' }}><Button width={width} label='Start a Campaign' /></Link>
            </div>
          </SplitRow>
          <SplitBrk/>
          <SplitRow>
            <div>
              <SplitTitle>Connect With Teammates</SplitTitle>
              <p>
                Volunteers.io’s chat feature allows you to stay up to date with your team and share updates in real time.
              </p>
            </div>
            <div>
              <SplitImg src={chatgif} alt=''/>
            </div>
          </SplitRow>
          <SplitBrk />
        </SplitContain>
      </>
    )
  }
}

export default Home