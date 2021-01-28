import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  top: 3rem;
  height: fit-content;
  min-height: 3rem;
  width: 100%;
  padding: 5px;
  z-index: 9;
  border-bottom: 1px solid ${props => props.theme.shadow};

  text-align: center;
  font-size: 0.85rem;
  line-height: 2rem;

  color: ${props => props.theme.text};
  background-color: ${props => props.theme.background};
  opacity: 0.9;
  backdrop-filter: blur(4px);

  transform: translateY(${props => props.show ? 0 : 'calc(-100% - 1px)'});
  transition: transform 1s ${props => props.show ? 'ease-out' : 'ease-in'};
`

const Notification = ({ notification }) => {

  const location = useLocation()

  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    if (notification.message) setTimeout(() => setShow(true), 1000)
    if (!notification.remain) setTimeout(() => setShow(false), 4000)
  }, [notification])

  if (location.pathname === '/') return null

  return <Wrapper show={show}>
    {notification.message}
    {notification.remain && <div>ok</div>}
  </Wrapper>
}

export default Notification