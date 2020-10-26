import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 5px;
  padding: 10px;
  position: relative;
  top: ${props => props.expanded ? `calc(-${props.position * 3.4}rem - ${props.position * 15}px)` : 0};
  height: ${props => props.expanded ? 'calc(100% - 10px)' : 'calc(3.4rem + 10px)'};
  opacity: ${props => props.visible ? 1 : 0};
  transition: all 0.2s;

  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  /* box-shadow: 1px 1px 1px ${props => props.theme.shadow}; */
  font-size: 0.85rem;
  line-height: 1.5rem;
  color: ${props => props.theme.text};
  font-weight: ${props => props.theme.fontWeight};
  overflow-y: hidden;
`

const Body = styled.div`
  position: relative;
  margin: 10px 0;
  padding: 15px;
  height: calc(100% - 5.4rem - 20px);
  background-color: ${props => props.theme.panels};
  font-size: 0.7rem;
`

const Open = styled.button`
  float: right;
  height: 2rem;
  width: 100px;
  border: 1px solid ${props => props.theme.primary};
  border-radius: 2px;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.background};
`

const ResultsItem = ({ visible, expanded, showDetails, id, position, name, description, signUp }) => {
  return (
    <Wrapper visible={visible} expanded={expanded} position={position} onClick={() => showDetails(id)}>
      {name}<br />skills list..
      <Body>
        {description}
      </Body>
      <Open expanded={expanded} onClick={() => signUp(id)}>Sign Up</Open>
    </Wrapper>
  )
}

export default ResultsItem