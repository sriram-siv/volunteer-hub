import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Wrapper = styled.button`
  display: block;
  width: 100%;
  border: none;
  font-family: 'Open Sans', sans-serif;
  background-color: ${props => props.theme.shadow};
  border-radius: 4px;
  line-height: 3rem;
  padding: 0 15px;
  margin: 5px 0;
  transition: all 0.2s;
  color: #333;

  &:hover {
    background-color: ${props => props.theme.shadow};
  }
`

const RoomCard = ({ room }) => {
  const history = useHistory()
  return <Wrapper onClick={() => history.push(`/chat/${room.id}`)}>
    {room.name}
  </Wrapper>
}

export default RoomCard