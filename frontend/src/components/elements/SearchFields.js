import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  height: 2rem;
  width: 350px;
  z-index: 1;
`

const Field = styled.div`
  position: relative;
  top: ${props => props.folded ? props.position : 0};
  margin-bottom: 5px;
  transition: all 1s;
`

class SearchFields extends React.Component {

  state = {
    folded: false
  }

  foldItems = () => {
    // this.setState({ folded: !this.state.folded })
  }

  render() {
    return (
      <Wrapper onClick={this.foldItems}>
        {this.props.children.map((component, i) => (
          <Field key={i} position={`calc(${i * -3.1}rem - ${i * 5}px)`} folded={this.state.folded}>{component}</Field>))}
      </Wrapper>
    )
  }
}

export default SearchFields