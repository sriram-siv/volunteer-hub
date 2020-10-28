import React from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import Schedule from './Schedule'

import { getAllSkills } from '../../lib/api'

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
    skillsOptions: null
  }

  componentDidMount = () => {
    this.getSkills()
  }

  getSkills = async () => {
    const response = await getAllSkills()
    const skillsOptions = response.data.map(skill => ({ value: skill.id, label: skill.name }))
    this.setState({ skillsOptions })
  }

  render() {
    const { schedule, skills, selectSchedule, selectSkills } = this.props
    const { skillsOptions } = this.state
    return (
      <Wrapper>
        <Title>Select Volunteers</Title>
        <p>show volunteers with these skills</p>
        <Select value={skills} options={skillsOptions} onChange={selectSkills} isMulti />
        <p>show volunteers available on</p>
        <Schedule schedule={schedule} handleClick={selectSchedule} />
      </Wrapper>
    )
  }
}

export default FilterVolunteers