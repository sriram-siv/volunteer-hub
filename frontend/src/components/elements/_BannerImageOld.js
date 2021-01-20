import React from 'react'
import styled from 'styled-components'

const Banner = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  height: 250px;
  width: 100%;
  max-width: 900px;
  margin: auto;
`

const BannerImage = ({ src }) => {

  const defaultSrc = require('../../images/default_banner.png')
  
  return <Banner src={src ? src : defaultSrc} />
}

export default BannerImage

