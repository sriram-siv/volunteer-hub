import styled from 'styled-components'

export const SplitContain = styled.section`
  
`
export const SplitRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  text-align: center;
  grid-gap: 20px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`

export const SplitTitle = styled.h1`
  font-size: 1.5rem;
`

export const SplitImg = styled.img `
  height: 65%;
  width: 65%;
  border-radius: 45px;

  @media (max-width: 760px) {
    display: none;
  }
`

export const SplitBrk = styled.div`
  height: 60px;
`
