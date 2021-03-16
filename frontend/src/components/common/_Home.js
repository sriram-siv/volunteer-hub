import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { SplitContain, SplitRow, SplitTitle, SplitImg, SplitBrk } from '../elements/Split'
import Button from '../elements/Button'

import campaigns from '../../images/campaigns.jpg'
import campPreview from '../../images/campPreview.jpg'
import chatgif from '../../gif/chatgif.gif'

const Hero = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  height: 15rem;
  width: 100vw;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-family: 'Montserrat Alternates', sans-serif;
  background-color: ${props => props.theme.primary};
  z-index: 5;

  a {
    position: absolute;
    bottom: 1rem;
    font-size: 1rem; 

  }

  button {
    &:hover {
      border-color: white;
    }
  }
`

class Home extends React.Component {

  componentDidMount = () => {
    const userId = localStorage.getItem('user_id')
    if (userId) this.props.history.push('/profile')
  }

  render() {

    return (
      <>
        <Hero>
          Welcome to Volunteer Hub
          <Link to='/campaigns'>
            <Button width="10rem">Get Started</Button>
          </Link>
        </Hero>
        <SplitContain>
          <SplitRow>
            <div>
              <SplitTitle>Use Your Skills to Help Out</SplitTitle>
              <p>
                Browse the best volunteer opportunities near you and match with those looking for someone with your skills. Your community needs your help, what are you waiting for?
              </p>
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
              Do you know of a local cause in need of a few helping hands? Get a qualified team together and you can start making a difference today by starting and managing a campaign.
              </p>
            </div>
          </SplitRow>
          <SplitBrk/>
          <SplitRow>
            <div>
              <SplitTitle>Connect With Teammates</SplitTitle>
              <p>
                Volunteer Hub’s chat feature allows you to stay up to date with your team and share updates in real time.
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