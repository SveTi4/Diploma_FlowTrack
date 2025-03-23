import styled from 'styled-components'
import { Sidebar } from '../../organisms/Sidebar/Sidebar'

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #000000;
  color: white;
`

const Content = styled.main`
  flex: 1;
  background: #1C1C1E;
`

interface MainTemplateProps {
  children: React.ReactNode
}

export const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <Container>
      <Sidebar />
      <Content>
        {children}
      </Content>
    </Container>
  )
} 