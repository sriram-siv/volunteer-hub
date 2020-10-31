import React from 'react'

import VolunteerList from './VolunteerList'

class MultiListVolunteer extends React.Component {

  state = {
    openList: ''
  }

  onListToggle = listName => {
    const openList = this.state.openList === listName ? '' : listName
    this.setState({ openList })
  }

  render() {
    const { openList } = this.state
    const { lists, actions } = this.props    
    return (
      <>
        {lists.map((list, i) => <VolunteerList key={i} openList={openList} actions={actions} list={list} onToggle={this.onListToggle} />)}
      </>
    )
  }
}

export default MultiListVolunteer