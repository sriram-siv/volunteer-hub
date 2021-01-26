import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 250px;
`

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
  z-index: ${props => props.active ? 3 : 0};
  overflow: hidden;
`

const MaskImage = styled.div`
  height: 250px;
  width: 100%;
  background: url(${props => props.src});
  background-position: top;
  background-size: cover;
  pointer-events: none;
`

const Profile = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  border: none;
  padding: 0;
  background-image: ${props => 'url(' + props.image + ')'};
  background-size: contain;
  background-color: ${props => props.theme.glass};
  width: calc(230px - 3rem);
  height: calc(230px - 3rem);
  border-radius: 4px;
  pointer-events: all;
`

const ProfileLabel = styled.div`
  position: absolute;
  top: 0;
  font-size: 0.85rem;
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  width: 100%;
  line-height: 1.5rem;
  background-color: ${props => props.theme.glass};
  color: ${props => props.theme.text};
  border-radius: 4px 4px 0 0;
`

const BannerImage = ({ src, profile, onProfileClick, profileLabel, maskActive }) => {

  const [imageLabelVisible, setImageLabelVisible] = React.useState(false)

  const defaultSrc = require('../../images/default_banner.png')
  
  return <Wrapper>
    <Mask active={maskActive}>
      <MaskImage src={src ? src : defaultSrc} />
    </Mask>
    <Banner src={src ? src : defaultSrc}>
      {profile &&
        <Profile
          image={profile}
          onClick={onProfileClick}
          onMouseEnter={() => setImageLabelVisible(true)}
          onMouseLeave={() => setImageLabelVisible(false)}
        >
          {imageLabelVisible && <ProfileLabel>{profileLabel}</ProfileLabel>}
        </Profile>
      }
    </Banner>
      
  </Wrapper>
}

export default BannerImage

