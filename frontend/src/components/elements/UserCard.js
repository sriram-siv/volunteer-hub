import React from 'react'
import styled, { ThemeContext } from 'styled-components'

import Schedule from './Schedule'

const Wrapper = styled.div`
  position: relative;
  height: ${props => props.isExpanded ? 'calc(19rem + 4px)' : '3rem'};
  background-color: ${props => props.isSelected ? props.theme.primary : props.theme.glass};
  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  font-size: 0.85rem;
  line-height: 1.5rem;
  color: #333;
  overflow-y: hidden;
  transition: height 0.3s;
  padding: 0 5px;
`

const Header = styled.div`
  display: flex;
  margin: 0 -5px;
`

const Title = styled.div`
  width: 100%;
  line-height: 3rem;
  padding-left: 15px;
`

const Button = styled.button`
  width: 6rem;
  height: calc(3rem - 2px);
  border: none;
  background-color: transparent;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${props => props.color};
  }
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 2px solid blue;
    outline-offset: -2px;
  }
`

const ProfilePic = styled.img`
  width: 3rem;
  height: 3rem;
  /* border-radius: 2px; */
  /* border-radius: 1px 0 2px 0; */
  background-color: palevioletred;
`

const Details = styled.div`
  height: 7rem;
  margin: 10px;
  p {
    line-height: 1.5rem;
  }
`

const UserCard = ({ user, confirm, deny, select, showDetail, isSelected, isExpanded }) => {

  const theme = React.useContext(ThemeContext)

  const [denyActive, setDenyActive] = React.useState(false)

  React.useEffect(
    () => setTimeout(() => setDenyActive(false), 2000),
    [denyActive]
  )

  const clickDeny = () => {
    if (!denyActive) setDenyActive(true)
    else deny(user.id)
  }

  const schedule = Array.from(
    { length: 14 },
    (_, i) => user.user_shifts.some(shift => shift.id === i + 1)
  )

  const showDefaultProfile = user.profile_image.includes('fg5afp4hagsrz2fgkbwd')

  return (
    <Wrapper isExpanded={isExpanded} isSelected={isSelected} >
      <Header>
        {!showDefaultProfile && <ProfilePic src={user.profile_image} />}
        {showDefaultProfile && <ProfilePic src={require('../../images/default_profile.png')} />}
        <Title onClick={() => showDetail(user.id)}>{user.username}</Title>

        {confirm &&
          <Button color="#afa" onClick={() => confirm(user.id)}>
            accept
          </Button>}
        {deny &&
          <Button color={denyActive ? '#f55' : '#faa'} onClick={clickDeny}>
            {denyActive ? 'sure?' : 'deny'}
          </Button>}
        {select &&
          <Button color={theme.primary} onClick={() => select(user.id)}>
            {isSelected ? 'deselect' : 'select'}
          </Button>}
      </Header>
      
      <Details>
        <p>{user.first_name} {user.last_name}</p>
        <p>{user.user_skills.map(skill => skill.name).join(', ')}</p>
      </Details>
      <Schedule schedule={schedule} hideBorder />

    </Wrapper>
  )
}

export default UserCard