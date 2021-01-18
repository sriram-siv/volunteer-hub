import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  height: fit-content;
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

  animation-name: toastAuto;
  animation-duration: 4s;
  animation-fill-mode: forwards;
`

const Notification = ({ notification }) => {
  
  const [message, setMessage] = React.useState('')

  React.useEffect(() => {
    setMessage(notification.message)
    setTimeout(() => setMessage(''), 4000)
  }, [notification])

  return message ? <Wrapper>{message}</Wrapper> : null
}

export default Notification