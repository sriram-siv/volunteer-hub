import styled from 'styled-components'

export const SplitContain = styled.section`
  position: relative;
  top: 17rem;
  width: 90vw;
  margin: 0 auto;
`
export const SplitRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: 20px;
  text-align: center;

  p {
    text-align: justify;
    margin: 2rem 1rem;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`

export const SplitTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`

export const SplitImg = styled.img `
  height: 80%;
  width: 100%;
  border-radius: 4px;
  border: 2px solid #fef15e;

  @media (max-width: 760px) {
    display: none;
  }
`

export const SplitBrk = styled.div`
  height: 60px;
`
