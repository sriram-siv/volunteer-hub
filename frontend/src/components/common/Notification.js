import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50vw;
  height: 3rem;
  width: 300px;
  max-width: 95vw;
  transform: translateX(-50%);
  z-index: 5;

  border: 1px solid ${props => props.theme.primary};
  border-radius: 2px;
  background-color: pink;
  animation: toast 3s infinite;
`

class Notification extends React.Component {

  state = {

  }

  testNotify = (val) => {
    console.log(val)
  }

  render() {
    return (
      <Wrapper>hello</Wrapper>
    )
  }
}

export default Notification