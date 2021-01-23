import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  overflow-y: scroll;
  background-color: transparent;
  border-radius: 4px;
  border: ${props => `1px solid ${props.theme.shadow}`};
  padding-left: 5px;
  padding-right: 2px;

  > * {
    margin: 5px 0;
  }
`

const Title = styled.div`
  text-align: left;
  line-height: 3rem;
  padding-left: 10px;
  color: ${props => props.theme.text};
  font-weight: ${props => props.theme.fontWeight};
  ::selection {
    background-color: transparent;
  }
`

const List = ({ title, items, itemElement }) => {

  const [itemExpanded, setItemExpanded] = React.useState(-1)

  const showDetail = id => {
    setItemExpanded(itemExpanded === id ? -1 : id)
  }

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {items?.map((item, i) => itemElement(item, i, itemExpanded, showDetail))}
    </Wrapper>
  )
}

export default List