import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 5px;
  padding-top: calc(2rem + 10px);
  background-color: ${props => props.theme.name === 'light' ? props.theme.panels : props.theme.background};
  border-radius: 2px;
  border: 1px solid ${props => props.hideBorder ? 'transparent' : props.theme.shadow};
  height: calc(6rem + 25px);
  overflow-x: scroll;
  overflow-y: hidden;
`

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 4rem;
  width: 14rem;
`

const Slot = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${props => props.active ? props.theme.primary : 'transparent'};

  &:hover {
    background-color: ${props => props.theme.primary};
    opacity: ${props => props.active ? 1 : 0.7};
    outline: 3px solid ${props => props.theme.panels};
    outline-offset: -3px;
  }
`

const SlotReadOnly = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${props => props.active ? props.theme.primary : 'transparent'};
`

const Label = styled.div`
  width: 2rem;
  line-height: 2rem;
  font-size: 0.85rem;
  text-align: center;
  color: ${props => props.theme.text};
`

const Time = styled.div`
  display: flex;
  flex-direction: column;
  width: 2rem;
  height: 4rem;
`

const Days = styled.div`
  display: flex;
  position: absolute;
  transform: translate(1rem, -2rem);
`

const Schedule = ({ schedule: slots, handleClick, hideBorder }) => {

  if (!slots) slots = Array.from({ length: 14 })

  return (
    <Wrapper hideBorder={hideBorder}>
      <Time>
        <Label>am</Label>
        <Label>pm</Label>
      </Time>
      <Days>
        <Label>mon</Label>
        <Label>tue</Label>
        <Label>wed</Label>
        <Label>thu</Label>
        <Label>fri</Label>
        <Label>sat</Label>
        <Label>sun</Label>
      </Days>
      <Grid>
        {slots.map((slot, i) => handleClick
          ? <Slot key={i} active={slot} onClick={() => handleClick?.(i)} />
          : <SlotReadOnly key={i} active={slot} />)}
      </Grid>
    </Wrapper>
  )
}

export default Schedule