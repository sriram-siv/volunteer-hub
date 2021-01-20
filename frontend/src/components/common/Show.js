/* eslint-disable camelcase */
import React from 'react'
import styled, { ThemeContext } from 'styled-components'
import Select from 'react-select'

import BannerImage from '../elements/BannerImage'

const Wrapper = styled.div`
  position: relative;
  height: calc(100vh - 3rem);
  overflow-y: scroll;
  background-color: ${props => props.theme.background};
  padding-bottom: 30px;
`

const Panel = styled.div`
  position: absolute;
  top: calc(255px - 3rem);
  left: 10px;
  width: calc(100vw - 23px);
  height: calc(120vh - 3rem - 20px);
  padding: 20px;
  padding-top: calc(3rem + 20px);
  background-color: ${props => props.theme.glass};
  border-radius: 4px;
  margin-bottom: 10px;
  backdrop-filter: blur(4px);
  z-index: 1;
`

const Title = styled.h2`
  position: ${props => props.sticky ? 'fixed' : 'relative'};
  top: ${props => props.sticky ? 'calc(3rem + 10px)' : 'calc(250px - 3rem)'};
  left: 10px;
  width: calc(100vw - 23px);
  font-size: 1.1rem;
  background-color: ${props => props.theme.primary};
  color: #333;
  padding: 12px 20px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 3rem;
  z-index: 3;
`

const SelectWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 10rem;
`

const ProfilePic = styled.button`
  position: fixed;
  top: calc(3rem + 15px);
  left: 10px;
  border: none;
  padding: 0;
  background-image: ${props => 'url(' + props.image + ')'};
  background-size: contain;
  background-color: ${props => props.theme.glass};
  width: calc(230px - 3rem);
  height: calc(230px - 3rem);
  border-radius: 4px;
`

const EditLabel = styled.div`
  position: absolute;
  top: 0;
  font-size: 0.85rem;
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  width: 100%;
  line-height: 1.5rem;
  background-color: ${props => props.theme.glass};
  color: ${props => props.theme.text};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const Show = ({ title, menu, banner, image, onImageClick, children }) => {
  
  const themeContext = React.useContext(ThemeContext)
  
  const [imageLabel, setImageLabel] = React.useState(false)
  const [stickyTitle, setStickyTitle] = React.useState(false)

  const toggleStickyTitleBar = event => {
    setStickyTitle(event.target.scrollTop >= 192)
  }

  const selectStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: themeContext.background,
      borderRadius: '2px',
      borderColor: themeContext.shadow,
      height: 'calc(2rem)'
    }),
    singleValue: styles => ({
      ...styles,
      color: themeContext.text,
      fontWeight: themeContext.fontWeight,
      letterSpacing: themeContext.letterSpacing,
      left: '50%',
      transform: 'translate(calc(-50% + 1rem), -50%)'
    }),
    menu: styles => ({
      ...styles,
      backgroundColor: themeContext.background,
      color: themeContext.text,
      borderRadius: '2px',
      textAlign: 'center'
    }),
    indicatorSeparator: () => ({ width: 0 })
  }

  return (
    <Wrapper onScroll={toggleStickyTitleBar}>

      <BannerImage src={banner} />

      {image &&
        <ProfilePic
          image={image}
          onClick={onImageClick}
          onMouseEnter={() => setImageLabel(true)}
          onMouseLeave={() => setImageLabel(false)}
        >
          {imageLabel && <EditLabel>change profile image</EditLabel>}
        </ProfilePic>
      }

      <Title sticky={stickyTitle}>{title}
        {menu &&
          <SelectWrapper>
            <Select
              styles={selectStyles}
              options={menu.options}
              value={menu.value}
              onChange={menu.onChange}
              isSearchable={false}
            />
          </SelectWrapper>
        }
      </Title>

      <Panel>
        {children}
      </Panel>
          
    </Wrapper>
  )
}

export default Show