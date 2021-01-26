import React from 'react'
import styled from 'styled-components'

const Banner = styled.div`
  position: fixed;
  top: 3rem;
  background-image: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  height: 250px;
  width: calc(100% - 3px);
  max-width: calc(900px - 3px);
  margin: auto;
  z-index: 0;
  pointer-events: none;
`

const Mask = styled.div`
  position: fixed;
  top: 3rem;
  width: calc(100% - 3px);
  max-width: calc(900px - 3px);
  height: 15px;
  z-index: 3;
  background: url(${props => props.src});
  background-position: top;
  background-size: cover;
  pointer-events: none;
`

const BannerImage = ({ src }) => {

  const defaultSrc = require('../../images/default_banner.png')
  
  return <>
    <Banner src={src ? src : defaultSrc} />
    <Mask src={src ? src : defaultSrc} />
  </>
}

export default BannerImage

