import React from 'react'
import Select from 'react-select'
import styled, { withTheme } from 'styled-components'

import Schedule from './Schedule'
import InputText from '../elements/InputText'
import Button from '../elements/Button'

import { getAllSkills } from '../../lib/api'
import styles from '../../lib/styles' 

const Wrapper = styled.div`
  height: 100%;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  padding: 10px;
  text-align: center;
  
  > * {
    margin: 10px auto 0;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  > button {
    width: calc(50% - 5px);
    margin: 0;
  }
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
    const { schedule, skills, selectSchedule, selectSkills, selectStrict, strictSkills, strictSchedule, groupName, editGroupName, createNewGroup } = this.props
    const { skillsOptions } = this.state

    return (
      <Wrapper>
        {/* <Title>Organise Volunteers</Title> */}
        <p>show volunteers with these skills</p>
        <Select styles={styles.select(this.props.theme)} value={skills} options={skillsOptions} onChange={selectSkills} isMulti />
        <CheckBox>
          <label htmlFor="strictSkills">All</label>
          <input type="checkbox" id="strictSkills" checked={strictSkills} onChange={selectStrict}/>
        </CheckBox>
        <p>show volunteers available on</p>
        <Schedule schedule={schedule} handleClick={selectSchedule} />
        <CheckBox>
          <label htmlFor="strictSchedule">All</label>
          <input type="checkbox" id="strictSchedule" checked={strictSchedule} onChange={selectStrict}/>
        </CheckBox>
        <InputText label="group name" name="groupName" value={groupName} returnValue={editGroupName} />
        <ButtonGroup>
          <Button label="select all" />
          <Button primary label="create group" onClick={createNewGroup} />
        </ButtonGroup>
      </Wrapper>
    )
  }
}

export default withTheme(FilterVolunteers)