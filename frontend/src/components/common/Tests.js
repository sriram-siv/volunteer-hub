import React from 'react'
import styled, { withTheme } from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: papayawhip;
  color: rgb(102, 41, 0);
  height: calc(100vh - 3rem);
`




class Tests extends React.Component {

  amount = Array.from({ length: 14 })

  render() {
    return (
      <Wrapper>
        
      </Wrapper>
    )
  }
}

export default Tests