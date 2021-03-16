import React from 'react'
import styled, { withTheme } from 'styled-components'
import icons from '../../lib/icons'
import ResultsItem from './ResultsItem'

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: ${props => props.isHidden ? '3rem' : 'calc(100vh - 9rem - 30px)'};
  background-color: ${props => props.theme.panels};
  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  overflow-y: hidden;
  overflow-x: hidden;
  transition: height 0.2s;
  padding: 2px;
  
  &:focus { outline: none; }
  &:focus-visible {
    border: 3px solid ${props => props.theme.focus};
    padding: 0px;
    outline: 2px solid ${props => props.theme.panels};
  }
`

const ListScroll = styled.div`
  position: relative;
  height: calc(100% - 3rem);
  overflow-y: ${props => props.scroll ? 'scroll' : 'hidden'};
  padding-right: ${props => props.scroll ? 0 : '3px'};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: calc(3rem - 4px);
  padding-right: 5px;
  cursor: pointer;
`

const Title = styled.div`
  text-align: left;
  padding-left: 10px;
  color: ${props => props.theme.text};
  font-size: 1rem;
  line-height: calc(3rem - 4px);
  font-weight: ${props => props.theme.fontWeight};
  ::selection {
    background-color: transparent;
  }
`

const Toggle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  height: 100%;
  transform: rotateZ(${props => props.isHidden ? '0deg' : '90deg'});
  transition: all 0.2s;
  pointer-events: none;
`

const ResultsList = ({ campaigns, signUp, resultShowingDetail, showDetail, theme }) => {

  const [isHidden, setIsHidden] = React.useState(true)

  React.useEffect(() => {
    if (resultShowingDetail !== -1) setIsHidden(false)
  }, [resultShowingDetail])

  const toggleView = () => setIsHidden(!isHidden)

  const activateWithKeyboard = event => {

    const isContainer = event.target.getAttribute('name') === 'list-container'
    const isActionKey = ['Enter', 'Space'].includes(event.code)

    if (isContainer && isActionKey) setIsHidden(!isHidden)
  }

  return (
    <Wrapper
      name="list-container"
      isHidden={isHidden}
      tabIndex="0"
      onKeyDown={activateWithKeyboard}
    >
      <Header onClick={toggleView}>
        <Title>Results</Title>
        <Toggle isHidden={isHidden}>{icons.right(theme.text)}</Toggle>
      </Header>
      <ListScroll scroll={resultShowingDetail === -1}>
        {campaigns && campaigns.map((campaign, i) => {
          const expanded = campaign.id === resultShowingDetail
          return (
            <ResultsItem
              key={i}
              position={i}
              {...campaign}
              listExpanded={!isHidden}
              expanded={expanded}
              visible={expanded || resultShowingDetail === -1}
              showDetails={showDetail}
              signUp={signUp}
            />
          )
        })}
      </ListScroll>
    </Wrapper>
  )
}

export default withTheme(ResultsList)