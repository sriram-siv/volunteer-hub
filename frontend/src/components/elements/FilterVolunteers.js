import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: calc(100% + 5px);
  margin-top: 5px;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  
`

class FilterVolunteers extends React.Component {


  render() {
    return (
      <Wrapper>hi</Wrapper>
    )
  }
}

export default FilterVolunteers