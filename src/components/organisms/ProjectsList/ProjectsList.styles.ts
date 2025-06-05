import styled from 'styled-components'

export const Content = styled.div`
  padding: 32px;
  overflow: auto;
  overflow: scroll;
  height: 100%;
`

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 48px;
  margin-top: 24px;
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`

export const HeaderContent = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
` 