import React from 'react'
import styled from 'styled-components'

import List from './List'


const Wrapper = styled.div`
  overflow-y: hidden;
  position: relative;
  transition: all 0.3s;
  height: ${props => {
    if (props.open) return '290px'
    if (props.show) return '45px'
    return 0
  }};
  opacity: ${props => props.show ? 1 : 0};
`

class MultiList extends React.Component {

  state = {
    openList: ''
  }

  onListToggle = listName => {
    const openList = this.state.openList === listName ? '' : listName
    this.setState({ openList })
  }

  render() {
    const { openList } = this.state
    const { containerStyle, lists } = this.props
    return (
      <div style={containerStyle}>
        {lists.map((list, i) => (
          <Wrapper key={i} position={i} show={!openList || openList === list.title} open={openList === list.title } >
            <List key={i} title={list.title} items={list.items} onToggle={this.onListToggle} />
            <div style={{ height: '5px' }}/> 
          </Wrapper>
        ))}
      </div>
    )
  }
}

export default MultiList