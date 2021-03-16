import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import Button from '../elements/Button'

const Page = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  /* background:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj48ZGVmcz48cGF0dGVybiBpZD0icGF0dGVybiIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB2aWV3Qm94PSIwIDAgNDAsNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMzUpICI+PHJlY3QgaWQ9InBhdHRlcm4tYmFja2dyb3VuZCIgd2lkdGg9IjQwMCUiIGhlaWdodD0iNDAwJSIgZmlsbD0icmdiYSgxNjMsIDE5MSwgMjUwLDEpIj48L3JlY3Q+IDxwYXRoIGZpbGw9InJnYmEoMjQwLCAyNTUsIDI0NCwxKSIgZD0iTSAtMTAgMzAgaCA2MCB2MiBoLTYweiBNLTEwIC0xMCBoNjAgdjIgaC02MCI+PC9wYXRoPjxwYXRoIGZpbGw9InJnYmEoMjUxLCAyMTEsIDE0MSwxKSIgZD0ibSAtMTAgMjkgaCA2MCB2MSBoLTYweiBNLTEwIC0xMSBoNjAgdjEgaC02MHoiPjwvcGF0aD48L3BhdHRlcm4+ICA8L2RlZnM+IDxyZWN0IGZpbGw9InVybCgjcGF0dGVybikiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiPjwvcmVjdD48L3N2Zz4="); */
  background:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj48ZGVmcz48cGF0dGVybiBpZD0icGF0dGVybiIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB2aWV3Qm94PSIwIDAgNDAsNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMzUpICI+PHJlY3QgaWQ9InBhdHRlcm4tYmFja2dyb3VuZCIgd2lkdGg9IjQwMCUiIGhlaWdodD0iNDAwJSIgZmlsbD0icmdiYSgxOTUsIDIxOCwgMjU0LDEpIj48L3JlY3Q+IDxwYXRoIGZpbGw9InJnYmEoMjQwLCAyNTUsIDI0NCwxKSIgZD0iTSAtMTAgMzAgaCA2MCB2MiBoLTYweiBNLTEwIC0xMCBoNjAgdjIgaC02MCI+PC9wYXRoPjxwYXRoIGZpbGw9InJnYmEoMjUxLCAyMTEsIDE0MSwxKSIgZD0ibSAtMTAgMjkgaCA2MCB2MSBoLTYweiBNLTEwIC0xMSBoNjAgdjEgaC02MHoiPjwvcGF0aD48L3BhdHRlcm4+ICA8L2RlZnM+IDxyZWN0IGZpbGw9InVybCgjcGF0dGVybikiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiPjwvcmVjdD48L3N2Zz4=");
`

const Wrapper = styled.div`
  display: flex;
  width: fit-content;
  margin: 5rem auto 2rem;

  > div, main {
    margin: 0 15px;
    box-shadow: 2px 2px 5px #aaa;
  }
`

const AppView = styled.div`
  width: 300px;
  height: fit-content;
  border-radius: 10px;
  

  img {
    width: 300px;
    height: auto;
    border-radius: 10px;
  }

  @media only screen and (max-width: 890px) {
    display: none;
  }

`

const Main = styled.main`

  position: relative;

  width: 370px;
  height: 570px;

  padding: 2rem 20px 0;


  border-radius: 10px;

  background-color: #fafafd;

  h1 {
    color: #333;
    font-family: 'Montserrat Alternates', sans-serif;
    text-align: center;
    font-weight: 100;
  }

  .breaker {
    width: calc(100% - 20px);
    height: 5px;
    background-color: yellow;
    margin: 0 auto 10px;
    border-radius: 4px;
  }

  h2 {
    font-size: 1rem;
    font-weight: 100;
    text-align: center;
    margin-bottom: 2rem;
  }

  p {
    font-family: 'Open Sans', sans-serif;
    font-weight: 200;
    font-size: 0.95rem;
    text-align: justify;
  }

  button {
    position: absolute;
    height: 4rem;
    bottom: 1rem;
    margin: -16px -20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    font-family: 'Open Sans', sans-serif;
  }


`


const Home = () => {

  const history = useHistory()

  const openApp = () => history.push('/campaigns')

  return (<Page>
    <Wrapper>

      <Main>
        <h1>VolunteerHub</h1>
        <div className="breaker"></div>
        <h2>use your skills to help out</h2>

        <p>
          Browse the best volunteer opportunities near you and match with those looking for someone with your skills. Your community needs your help, what are you waiting for?
        </p>
        <p>
          Do you know of a local cause in need of a few helping hands? Get a qualified team together and you can start making a difference today by starting and managing a campaign.
        </p>
        
        <p>
          Make the most of your communities time by using VolunteerHub's tools to
          match skills, organise schedules, and coordinate your team using community noticeboards and chat rooms.
        </p>

        <Button primary width="100%" onClick={openApp}>&nbsp;&nbsp;&nbsp; Find a Campaign &nbsp;&nbsp;&nbsp; ➝</Button>

      </Main>
    
      <AppView>
        <img src={require('../../images/screenshot_main.png')} alt="VolunteerHub App Homepage"/>
      </AppView>

    </Wrapper>
  </Page>)
}




export default Home