import React from 'react'
import styled, { withTheme } from 'styled-components'
import icons from '../../lib/icons'
import ResultsItem from './ResultsItem'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.isHidden ? '3rem' : 'calc(100vh - 9rem - 30px)'};
  background-color: ${props => props.theme.panels};
  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  overflow-y: hidden;
  transition: height 0.2s;
`

const ListScroll = styled.div`
  position: relative;
  height: calc(100% - 3rem);
  overflow-y: ${props => props.scroll ? 'scroll' : 'hidden'};
  padding-right: ${props => props.scroll ? 0 : '3px'};
`

const Title = styled.div`
  text-align: left;
  padding-left: 10px;
  color: ${props => props.theme.text};
  font-size: 1rem;
  line-height: 3rem;
  font-weight: ${props => props.theme.fontWeight};
  ::selection {
    background-color: transparent;
  }
  cursor: pointer;
`

const Toggle = styled.div`
  position: absolute;
  top: 0.65rem;
  right: 15px;
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

  return (
    <Wrapper isHidden={isHidden}>
      <Toggle isHidden={isHidden}>{icons.right(theme.text)}</Toggle>
      <Title onClick={toggleView}>Results</Title>
      <ListScroll scroll={resultShowingDetail === -1}>
        {campaigns && campaigns.map((campaign, i) => {
          const expanded = campaign.id === resultShowingDetail
          return (
            <ResultsItem
              key={i}
              position={i}
              {...campaign}
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