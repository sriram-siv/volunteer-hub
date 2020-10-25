import React from 'react'
import styled from 'styled-components'

import { SplitContain, SplitRow, SplitTitle, SplitImg, SplitBrk } from '../elements/Split'
import campaigns from '../../images/campaigns.jpg'

const Hero = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-family: 'Montserrat Alternates', sans-serif;
`

const Landing = () => {
  return (
    <>
      <Hero>Welcome to Volunteer.io</Hero>
      <SplitContain>
        <SplitRow>
          <div>
            <SplitTitle>Find a Volunteer Opportunity</SplitTitle>
            <p>
              Browse the best volunteer opportunities near you and even match with those looking for someone with your skills.
            </p>
            <p>
              Your community needs your help, what are you waiting for?
            </p>
          </div>
          <div>
            <SplitImg src={campaigns} alt='' />
          </div>
        </SplitRow>
        <SplitBrk/>
        <SplitRow>
          <div>
            <SplitImg src={campaigns} alt=''/>
          </div>
          <div>
            <SplitTitle>Create Volunteer Opportunities</SplitTitle>
            <p>
            Do you know of someone or a project in need of a few helping hands? Get a qualified team together and you can start making a difference today by starting a campaign.
            </p>
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
            <SplitImg src={campaigns} alt=''/>
          </div>
        </SplitRow>
      </SplitContain>
    </>
  )
}

export default Landing