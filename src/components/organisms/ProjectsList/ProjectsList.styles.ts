import styled from 'styled-components'

export const Content = styled.div`
  padding: 24px;
  flex: 1;
  overflow-y: auto;

  @media (max-width: 480px) {
    padding: 16px;
  }
`

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding-bottom: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding-bottom: 48px;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    flex-shrink: 0;
  }
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
` 