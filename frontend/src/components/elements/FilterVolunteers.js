import React from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import Schedule from './Schedule'

const Wrapper = styled.div`
  height: calc(100% + 5px);
  margin-top: 5px;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  padding: 10px;
  text-align: center;
  
  > * {
    margin: 10px auto;
  }
`

const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 20px;
`

class FilterVolunteers extends React.Component {

  state = {

  }

  

  render() {
    const { schedule, skills, editSchedule, editSkills } = this.props
    return (
      <Wrapper>
        <Title>Select Volunteers</Title>
        <p>show volunteers with these skills</p>
        <Select onChange={editSkills} />
        <p>show volunteers available on</p>
        <Schedule schedule={schedule} handleClick={editSchedule} />
      </Wrapper>
    )
  }
}

export default FilterVolunteers