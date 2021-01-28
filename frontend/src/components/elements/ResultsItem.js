/* eslint-disable camelcase */
import React from 'react'
import styled from 'styled-components'

import Button from './Button'

const Wrapper = styled.div`
  margin: 5px;
  margin-right: 2px;
  padding: 5px;
  padding-bottom: 25px;
  position: relative;
  top: ${props => props.expanded ? `calc(-${props.position * 3.4}rem - ${props.position * 15}px)` : 0};
  height: ${props => props.expanded ? 'calc(100% - 10px)' : 'calc(3.4rem + 10px)'};
  opacity: ${props => props.visible ? 1 : 0};
  transition: height 0.4s, top 0.4s, opacity 0.2s;

  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  color: ${props => props.theme.text};
  overflow-y: hidden;

  > button {
    float: right;
    opacity: ${props => props.expanded ? 1 : 0};
    transition: opacity 0.2s ${props => props.expanded ? '0.3s' : 0};
  }
`

const Title = styled.div`
  height: 4rem;
  margin: -5px;
  padding: 10px;
  overflow: hidden;
  font-size: 0.85rem;
  line-height: 1.5rem;
  font-weight: ${props => props.theme.fontWeight};
  cursor: pointer;
`

const Body = styled.div`
  position: relative;
  margin: 10px 0 5px;
  padding: 15px;
  height: calc(100% - 5.4rem - 10px);
  background-color: ${props => props.theme.glass};
  color: #333;
  font-size: 0.7rem;
  line-height: 1.5rem;
  border-radius: 2px;
`

const ResultsItem = ({ visible, expanded, showDetails, id, position, name, description, campaign_skills, signUp }) => {
  return (
    <Wrapper visible={visible} expanded={expanded} position={position}>
      <Title onClick={() => showDetails(id)}>
        {name}<br />
        <p>{campaign_skills.map(skill => skill.name).join(', ')}</p>
      </Title>
      <Body>
        {description}
      </Body>
      <Button primary onClick={() => signUp(id)}>sign up</Button>
    </Wrapper>
  )
}

export default ResultsItem