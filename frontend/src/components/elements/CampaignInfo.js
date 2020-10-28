import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-size: 0.85rem;
  height: calc(4rem + 330px);
  text-align: justify;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.shadow};
  padding: 20px;
  background-color: ${props => props.theme.panels};
  color: ${props => props.theme.text};
`

const Title = styled.div`
  text-align: center;
  font-weight: 600;
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: 1rem;
`

const CampaignInfo = ({ campaignData }) => {



  return (
    <Wrapper>
      <Title>{campaignData.name}</Title>
      {campaignData.description}
    </Wrapper>
  )
}

export default CampaignInfo