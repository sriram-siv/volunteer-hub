import React from 'react'

import VolunteerList from './VolunteerList'

const MultiListVolunteer = ({ lists, actions }) => {
  const [openList, setOpenList] = React.useState('')
  const toggleList = listName => {
    setOpenList(listName === openList ? '' : listName)
  }
  return lists.map((list, i) => (
    <VolunteerList key={i} openList={openList} actions={actions} list={list} onToggle={toggleList} />))
}

export default MultiListVolunteer