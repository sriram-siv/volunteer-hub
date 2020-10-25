import React from 'react'
import styled, { withTheme } from 'styled-components'

import BannerImage from '../elements/BannerImage'

const Wrapper = styled.div`
  display: flex;
  background-color: papayawhip;
  color: rgb(102, 41, 0);
  height: calc(100vh - 3rem);
`


class Tests extends React.Component {

  render() {
    return (
      <Wrapper>
        <BannerImage />
      </Wrapper>
    )
  }
}

export default Tests