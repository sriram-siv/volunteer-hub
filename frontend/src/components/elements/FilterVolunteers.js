import React from 'react'
import Select from 'react-select'
import styled, { withTheme } from 'styled-components'

import Schedule from './Schedule'
import InputText from '../elements/InputText'

import { getAllSkills } from '../../lib/api'

const Wrapper = styled.div`
  height: 100%;
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

const CheckBox = styled.div`
  text-align: right;
  > * { margin-right: 15px }
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
    const { schedule, skills, selectSchedule, selectSkills, selectStrict, strictSkills, strictSchedule, groupName, editGroupName } = this.props
    const { skillsOptions } = this.state

    const selectStyles = {
      control: styles => ({
        ...styles,
        backgroundColor: this.props.theme.background,
        borderRadius: '2px',
        borderColor: this.props.theme.shadow,
        height: '5rem'
      }),
      singleValue: (styles) => ({
        ...styles,
        color: this.props.theme.text,
        fontWeight: this.props.theme.fontWeight,
        letterSpacing: this.props.theme.letterSpacing,
        fontSize: '0.85rem'
      })
    }

    return (
      <Wrapper>
        <Title>Organise Volunteers</Title>
        <p>show volunteers with these skills</p>
        <Select styles={selectStyles} value={skills} options={skillsOptions} onChange={selectSkills} isMulti />
        <CheckBox>
          <label htmlFor="strictSkills">All</label>
          <input type="checkbox" id="strictSkills" checked={strictSkills} onClick={selectStrict}/>
        </CheckBox>
        <p>show volunteers available on</p>
        <Schedule schedule={schedule} handleClick={selectSchedule} />
        <CheckBox>
          <label htmlFor="strictSchedule">All</label>
          <input type="checkbox" id="strictSchedule" checked={strictSchedule} onClick={selectStrict}/>
        </CheckBox>
        <InputText label="group name" name="groupName" value={groupName} returnValue={editGroupName} />
      </Wrapper>
    )
  }
}

export default withTheme(FilterVolunteers)