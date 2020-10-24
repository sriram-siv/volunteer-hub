import React from 'react'
import styled from 'styled-components'

import BannerImage from '../elements/BannerImage'
import MultiList from '../elements/MultiList'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  min-height: calc(100vh - 3rem);
`
// height: calc(100vh - 3rem);

class CampaignShow extends React.Component {

  render() {

    // Might be more flexible if we passed in an array of the item components
    const members = 
      { title: 'members', items: ['sri', 'don', 'charlotte', 'jack'] }
    const groups = 
      { title: 'groups', items: [ 'coordinators', 'team', 'Don' ] }
    
    const multiListStyle = {
      position: 'absolute',
      top: 'calc(3rem + 5px)',
      right: '5px'
    }

    return (
      <Wrapper>
        <BannerImage />
        <MultiList containerStyle={multiListStyle} lists={[members, groups]} />
        <div style={{ display: 'flex' }}>
          <div style={{ width: '600px', padding: '20px', fontSize: '0.85rem', textAlign: 'justify' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit fugit voluptatibus, obcaecati odio non provident similique possimus saepe eum adipisci eius? In nesciunt, labore nam placeat, magnam facere consectetur officia consequatur natus illo temporibus eaque dolore molestiae. Sunt libero blanditiis eius tempore, deserunt iste quasi cumque dolorem minima illum, asperiores quidem dicta eaque maiores amet ipsa ipsum eveniet pariatur sit reiciendis </div>          
          <div style={{ width: '100%', margin: '10px', padding: '20px', border: '2px solid #fef715', backgroundColor: '#aeb4ba', color: '#333', textAlign: 'center' }}>
            Notices
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default CampaignShow