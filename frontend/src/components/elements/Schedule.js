import React from 'react'
import styled from 'styled-components'


const ScheduleContainer = styled.div`
  background-color: ${props => props.theme.panels};
  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  margin-bottom: 15px;
`

const Wrapper = styled.div`
  position: relative;
  margin: auto;
  padding: 5px;
  padding-left: calc(2rem + 5px);
  width: calc(16rem + 20px);
  height: calc(6rem + 20px);
`

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 4rem;
  width: 14rem;
  border-radius: 2px;
  background-color: ${props => props.theme.background};
`

const Slot = styled.div`
  width: 2rem;
  height: 2rem;
  border-top-left-radius: ${props => props.position === 0 ? '2px' : 0};
  border-top-right-radius: ${props => props.position === 12 ? '2px' : 0};
  border-bottom-left-radius: ${props => props.position === 1 ? '2px' : 0};
  border-bottom-right-radius: ${props => props.position === 13 ? '2px' : 0};

  background-color: ${props => props.active ? props.theme.primary : 'transparent'};
`

const Label = styled.div`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border-radius: 2px;
  font-size: 0.85rem;
  text-align: center;
  line-height: 2rem;
  color: ${props => props.theme.text};
`

const Time = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(2rem + 5px);
  left: 5px;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  color: ${props => props.theme.text};
`

class Schedule extends React.Component {

  state = {
    slots: Array.from({ length: 14 }).fill(false)
  }

  handleClick = (position) => {
    const slots = [...this.state.slots]
    slots[position] = !slots[position]
    this.setState({ slots })
  }

  render() {
    const { schedule: slots, handleClick } = this.props
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

    return (
      <ScheduleContainer>
        <Wrapper>
          <Time>
            {['am', 'pm'].map((time, i) => <Label key={i}>{time}</Label>)}
          </Time>
          {days.map((day, i) => <Label key={i}>{day}</Label>)}
          <Grid>
            {slots && slots.map((slot, i) => <Slot key={i} position={i} active={slot} onClick={handleClick ? () => handleClick(i) : null}/>)}
          </Grid>
        </Wrapper>
      </ScheduleContainer>
    )
  }
}

export default Schedule