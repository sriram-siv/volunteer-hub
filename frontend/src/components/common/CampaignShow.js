import React from 'react'
import styled, { withTheme } from 'styled-components'

import BannerImage from '../elements/BannerImage'
import MultiList from '../elements/MultiList'

const Wrapper = styled.div`
  display: flex;
  background-color: papayawhip;
  color: rgb(102, 41, 0);
  height: calc(100vh - 3rem);
`


class CampaignShow extends React.Component {

  render() {

    const lists = [
      { title: 'members', items: ['sri', 'don', 'charlotte', 'jack'] },
      { title: 'groups', items: [ 'coordinators', 'team', 'Don' ] }
    ]

    const multiListStyle = {
      position: 'absolute',
      top: 'calc(3rem + 5px)',
      right: '5px'
    }

    return (
      <Wrapper>
        <BannerImage />
        <MultiList containerStyle={multiListStyle} lists={lists}/>
      </Wrapper>
    )
  }
}

export default CampaignShow