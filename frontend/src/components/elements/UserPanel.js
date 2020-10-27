import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  z-index: 20;
  top: 0;
  left: ${props => props.visible ? '100px' : '60px'};
  width: 15rem;
  height: 3rem;
  opacity: ${props => props.visible ? 1 : 0};
  transition: all 0.2s;
  pointer-events: ${props => props.visible ? 'all' : 'none'};
  > * {
    margin: 5px;
  }
`

const Link = styled.a`
  line-height: 3rem;
  color: #282828;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    color: #282828;
  }
`

const UserPanel = ({ visible, openProfile, logout }) => {
  return (
    <Wrapper visible={visible}>
      <Link onClick={openProfile}>profile</Link>
      <Link onClick={logout}>logout</Link>
    </Wrapper>
  )
}

export default UserPanel