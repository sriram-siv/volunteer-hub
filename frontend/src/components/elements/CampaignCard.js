import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.button`
  display: block;
  width: 100%;
  border: none;
  font-family: 'Open Sans', sans-serif;
  background-color: ${props => props.theme.background};
  border-radius: 4px;
  line-height: 3rem;
  padding: 0 15px;
  margin: 5px 0;
  transition: all 0.2s;
  color: ${props => props.theme.text};

  &:hover {
    background-color: ${props => props.theme.shadow};
  }
`

const CampaignCard = ({ campaign, onClick }) => (
  <Wrapper onClick={() => onClick(`/campaigns/${campaign.id}`)}>
    {campaign.name}
  </Wrapper>
)

export default CampaignCard