import React from 'react'
import styled from 'styled-components'

const Banner = styled.div`
  background-image: url(${props => props.src});
  height: 250px;
  width: 100%;
`

const BannerImage = ({ src, children }) => {
  if (children) {
    if (!children.length) children = [children]
  }
  const defaultSrc = 'https://mondrian.mashable.com/lead-img-anti-racist-curriculum.jpg'
  return (
    <Banner src={src ? src : defaultSrc}>
      {children && children.map(component => component)}
    </Banner>
  )
}

export default BannerImage

