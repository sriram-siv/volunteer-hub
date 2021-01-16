import React from 'react'
import styled from 'styled-components'

const Banner = styled.div`
  background-image: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 250px;
  width: 100%;
`

const BannerImage = ({ src, children }) => {
  if (children) {
    if (!children.length) children = [children]
  }
  const defaultSrc = require('../../images/default_banner.png')
  
  return (
    <Banner src={src ? src : defaultSrc}>
      {/* {children && children.map(component => component)} */}
      {children}
    </Banner>
  )
}

export default BannerImage

