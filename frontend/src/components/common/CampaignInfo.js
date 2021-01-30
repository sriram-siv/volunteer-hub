import React from 'react'

const CampaignInfo = ({ campaignData }) => {


  return campaignData.description.split('\n').map((para, i) => <p key={i}>{para}</p>)
}

export default CampaignInfo