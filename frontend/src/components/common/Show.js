/* eslint-disable camelcase */
import React from 'react'
import styled, { ThemeContext } from 'styled-components'
import Select from 'react-select'

import styles from '../../lib/styles'

import BannerImage from '../elements/BannerImage'

const Wrapper = styled.div`
  position: relative;
  height: calc(100vh - 3rem);
  overflow-y: scroll;
  background-color: ${props => props.theme.background};
  padding-bottom: 30px;
  /* padding-right: 3px; */ //TODO check if this solves layout issue with scrollbar
`

const Panel = styled.div`
  position: absolute;
  top: calc(255px - 3rem);
  left: 10px;
  width: calc(100vw - 23px);
  min-height: calc(100vh - 3rem - 15px);
  padding: 20px;
  padding-top: calc(3rem + 20px);
  background-color: ${props => props.theme.glass};
  border-radius: 4px;
  backdrop-filter: blur(4px);
  z-index: 1;
`

const Title = styled.h2`
  position: ${props => props.sticky ? 'fixed' : 'relative'};
  top: ${props => props.sticky ? 'calc(3rem + 10px)' : 'calc(0px - 3rem)'};
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

  .menu {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 10rem;
  }
`

const Action = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  height: calc(3rem - 10px);
  border: 2px solid transparent;
  border-radius: 2px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 0 20px;
  font-size: 0.85rem;

  &:hover {
    background-color: ${props => props.theme.primary};
    color: #333;
    border: 2px solid ${props => props.theme.background};
  }
`

/**
 * Template for show pages, with sticky title bar, glassy panel and masked banner image
 * Child components displayed inside panel. Optional inner image that lays on top of banner.
 * Optional menu object that needs value, onChange and options (react-select options array)
 */
const Show = ({ title, action, menu, banner, image, imageLabel, onImageClick, children }) => {
  
  const theme = React.useContext(ThemeContext)
  
  const [stickyTitle, setStickyTitle] = React.useState(false)

  const toggleStickyTitleBar = event => {
    setStickyTitle(event.target.scrollTop >= 190)
  }

  return (
    <Wrapper onScroll={toggleStickyTitleBar}>

      <BannerImage
        src={banner}
        profile={image}
        onProfileClick={onImageClick}
        profileLabel={imageLabel}
        maskActive={stickyTitle}
      />

      <Title sticky={stickyTitle}>
        {title}
        {menu &&
          <Select
            className="menu"
            styles={styles.select(theme)}
            options={menu.options}
            value={menu.value}
            onChange={menu.onChange}
            isSearchable={false}
          />
        }
        {action && <Action onClick={action.click}>{action.label}</Action>}
      </Title>

      <Panel>
        {children}
      </Panel>
          
    </Wrapper>
  )
}

export default Show