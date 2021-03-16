/* eslint-disable camelcase */
import React from 'react'
import styled from 'styled-components'

import Button from './Button'

import { actionKeyPressed } from '../../lib/helper'

const Wrapper = styled.article`
  margin: 5px;
  margin-right: 2px;
  padding: 5px;
  position: relative;
  top: ${props => props.expanded ? `calc(-${props.position * 3.4}rem - ${props.position * 15}px)` : 0};
  height: ${props => props.expanded ? 'calc(100% - 10px)' : 'calc(3.4rem + 10px)'};
  opacity: ${props => props.visible ? 1 : 0};
  transition: height 0.4s, top 0.4s, opacity 0.2s;

  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  color: ${props => props.theme.text};
  overflow: hidden;

  > button {
    opacity: ${props => props.expanded ? 1 : 0};
    pointer-events: ${props => props.expanded ? 'all' : 'none'};
    transition: opacity 0.2s ${props => props.expanded ? '0.3s' : 0};
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  &:focus { outline: none; }
  &:focus-visible {
    border: 2px solid ${props => props.theme.focus};
    padding: 4px;
    outline: 1px solid ${props => props.theme.panels};
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

  > p {
    margin: 0;
  }
`

const Body = styled.div`
  position: relative;
  margin: 10px -5px 0;
  padding: 15px;
  padding-bottom: 3rem;
  height: calc(100% - 3rem + 4px);
  overflow-y: ${props => props.expanded ? 'scroll' : 'hidden'};
  background-color: ${props => props.theme.glass};
  color: #333;
  font-size: 0.7rem;
  line-height: 1.5rem;
`

const ResultsItem = ({ listExpanded, visible, expanded, showDetails, id, position, name, description, campaign_skills, signUp }) => {

  const activateWithKeys = event => {
    if (actionKeyPressed(event, 'item-container'))
      showDetails(id)
  }

  const expandItem = () => showDetails(id)
  const signUpToCampaign = () => signUp(id)

  return (
    <Wrapper
      name="item-container"
      visible={visible}
      expanded={expanded}
      position={position}
      tabIndex={listExpanded && visible ? 0 : -1}
      onKeyDown={activateWithKeys}
    >
      <Title onClick={expandItem}>
        <p>{name}</p>
        <p>{campaign_skills.map(skill => skill.name).join(', ')}</p>
      </Title>

      <Body>
        {description}
      </Body>

      <Button
        primary
        onClick={signUpToCampaign}
        tabIndex={listExpanded && expanded ? 0 : -1}
      >
        sign up
      </Button>

    </Wrapper>
  )
}

export default ResultsItem