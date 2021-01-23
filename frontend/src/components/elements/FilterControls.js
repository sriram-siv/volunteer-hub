import React from 'react'
import Select from 'react-select'
import styled, { withTheme } from 'styled-components'

import Schedule from './Schedule'
import InputText from './InputText'
import Button from './Button'

import { getAllSkills } from '../../lib/api'
import styles from '../../lib/styles' 

const Wrapper = styled.div`
  height: 100%;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.shadow};
  padding: 10px;
  text-align: center;
  
  > * {
    margin: 10px auto 0;
  }
`

const CheckBox = styled.div`
  text-align: right;
  > * { margin-right: 15px }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  > button {
    width: calc(50% - 5px);
    margin: 0;
  }
`

const FilterControls = props => {

  const {
    theme,
    schedule,
    skills,
    selectSchedule,
    selectSkills,
    toggleStrict,
    toggleList,
    groupName,
    editGroupName,
    selectAll,
    createNewGroup
  } = props

  const [skillsOptions, setSkillsOptions] = React.useState()

  const getSkills = async () => {
    try {
      const { data } = await getAllSkills()
      setSkillsOptions(data.map(skill => ({ value: skill.id, label: skill.name })))
    } catch (err) {
      console.error(err)
    }
  }

  React.useEffect(getSkills, [])

  return (
    <Wrapper>
      <Button onClick={toggleList}>togglelist</Button>

      <p>show volunteers with these skills</p>
      <Select styles={styles.select(theme)} value={skills.values} options={skillsOptions} onChange={selectSkills} isMulti />
      <CheckBox>
        <label htmlFor="strictSkills">All</label>
        <input type="checkbox" id="skills" checked={skills.strict} onChange={toggleStrict}/>
      </CheckBox>
      <p>show volunteers available on</p>
      <Schedule schedule={schedule.values} handleClick={selectSchedule} />
      <CheckBox>
        <label htmlFor="strictSchedule">All</label>
        <input type="checkbox" id="schedule" checked={schedule.strict} onChange={toggleStrict}/>
      </CheckBox>
      <InputText label="group name" name="groupName" value={groupName} returnValue={editGroupName} />
      <ButtonGroup>
        <Button onClick={selectAll}>select all</Button>
        <Button primary onClick={createNewGroup}>create group</Button>
      </ButtonGroup>
    </Wrapper>
  )
}

export default withTheme(FilterControls)