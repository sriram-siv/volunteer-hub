import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50vw;
  height: 2rem;
  width: 300px;
  max-width: 95vw;
  transform: translateX(-50%);
  z-index: 9;

  text-align: center;
  font-size: 0.85rem;
  line-height: 2rem;

  border: 1px solid ${props => props.theme.primary};
  border-radius: 2px;
  background-color: ${props => props.theme.panels};
  color: ${props => props.theme.text};
  animation-name: toastAuto;
  animation-duration: 4s;
  animation-fill-mode: forwards;
`

class Notification extends React.Component {

  state = {
    notification: null
  }
  
  componentDidUpdate = (prevProps) => {
    if (prevProps.notification !== this.props.notification) {
      this.showNotification()
      setTimeout(this.hideNotification, 4000)
    }
  }

  showNotification = () => {
    const { notification } = this.props
    this.setState({ notification: notification.message })
  }

  hideNotification = () => {
    this.setState({ notification: null })
  }
  
  render() {
    const { notification } = this.state
    if (!notification) return null
    return <Wrapper>{notification}</Wrapper>
  }
}

export default Notification