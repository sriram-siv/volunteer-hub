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
  z-index: 5;

  text-align: center;
  font-size: 0.85rem;
  line-height: 2rem;

  border: 1px solid ${props => props.theme.primary};
  border-radius: 2px;
  background-color: ${props => props.theme.panels};
  color: ${props => props.theme.text};
  animation-name: ${props => {
    if (!props.notification) return 'none'
    switch (props.notification.auto) {
      case 0:
        return 'toastAuto'
      case 1:
        return 'toastShow'
      case -1:
        return 'toastHide'
    }
  }};
  animation-duration: 4s;
  animation-fill-mode: forwards;
`

class Notification extends React.Component {

  state = {
    notification: null
  }
  
  componentDidUpdate = () => {
    if (!this.props.notification.message) return
    if (!this.state.notification) {
      this.setState({ notification: this.props.notification })
      return
    }
    if (this.props.notification.message !== this.state.notification.message) {
      this.setState({ notification: this.props.notification })
    }
  }

  hideNotifcation = () => {
    const notification = this.state.notification
    notification.auto = -1
    this.setState({ notification })
    setTimeout(() => this.setState({ notification: null }), 4000)
  }

  render() {
    const { notification } = this.state
    return (
      <Wrapper notification={notification} onClick={this.hideNotifcation} >{notification && notification.message}</Wrapper>
    )
  }
}

export default Notification