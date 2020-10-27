import React from 'react'
import styled, { withTheme } from 'styled-components'
import icons from '../../lib/icons'
import ResultsItem from './ResultsItem'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.isHidden ? '40px' : 'calc(100vh - 9rem - 30px)'};
  background-color: ${props => `${props.theme.background}e`};
  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  overflow-y: hidden;
  transition: all 0.2s;
`

const ListScroll = styled.div`
  position: relative;
  margin-top: 5px;
  height: calc(100% - 40px);
  overflow-y: ${props => props.scroll ? 'scroll' : 'hidden'};
`

const Title = styled.div`
  text-align: left;
  line-height: 30px;
  padding-top: 5px;
  padding-left: 10px;
  color: ${props => props.theme.text};
  font-size: 1rem;
  font-weight: ${props => props.theme.fontWeight};
  ::selection {
    background-color: transparent;
  }
  `

const Toggle = styled.div`
  position: absolute;
  top: 7px;
  right: 15px;
  transform: rotateZ(${props => props.isHidden ? '0deg' : '90deg'});
  transition: all 0.2s;
`

class ResultsList extends React.Component {

  state = {
    isHidden: true,
    resultShowingDetail: -1
  }

  componentDidUpdate = () => {
    
    if (this.props.resultShowingDetail !== this.state.resultShowingDetail) {
      this.setState({ isHidden: false, resultShowingDetail: this.props.resultShowingDetail })
    }
  }

  toggleView = () => {
    this.setState({ isHidden: !this.state.isHidden })
  }

  showDetail = id => {
    const resultShowingDetail = this.state.resultShowingDetail === id ? -1 : id
    this.props.showDetail(resultShowingDetail)
  }

  render() {
    const { isHidden, resultShowingDetail } = this.state
    const { campaigns, signUp, label } = this.props

    return (
      <Wrapper isHidden={isHidden}>
        <Toggle isHidden={isHidden} onClick={this.toggleView}>{icons.right(this.props.theme.text)}</Toggle>
        <Title>{label}</Title>
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
                showDetails={this.showDetail}
                signUp={signUp}
              />
            )
          })}
        </ListScroll>
      </Wrapper>
    )
  }
}

export default withTheme(ResultsList)