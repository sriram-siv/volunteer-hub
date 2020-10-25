import React from 'react'
import styled from 'styled-components'
import icons from '../../lib/icons'

// position: ${props => props.isHidden ? 'relative' : 'absolute'};
// top: 0;
const Wrapper = styled.div`
  position: relative;
  width: 200px;
  height: ${props => props.isHidden ? '40px' : '290px'};
  background-color: ${props => `${props.theme.shadow}dd`};
  border-radius: 2px;
  border: 1px solid #999;
  overflow-y: hidden;
  transition: all 0.2s;
`

const ListScroll = styled.div`
  margin-top: 5px;
  height: 245px;
  overflow-y: scroll;
`

const ItemDetail = styled.div`
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  margin: 0 5px 5px;
  border-radius: 2px;
`

const Title = styled.div`
  text-align: center;
  line-height: 30px;
  padding-top: 5px;
  color: #333;
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

class List extends React.Component {

  state = {
    isHidden: true
  }

  toggleView = () => {
    this.setState({ isHidden: !this.state.isHidden })
    this.props.onToggle(this.props.title)
  }

  render() {
    const { isHidden } = this.state
    const { title, items } = this.props
    return (
      <Wrapper isHidden={isHidden}>
        <Toggle isHidden={isHidden} onClick={this.toggleView}>{icons.right()}</Toggle>
        <Title>{title}</Title>
        <ListScroll>
          {items.map((item, i) => <ItemDetail key={i}>{item}</ItemDetail>)}
        </ListScroll>
      </Wrapper>
    )
  }
}

export default List