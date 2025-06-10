import { Sidebar } from '../../organisms/Sidebar/Sidebar'
import { Container, Content } from './MainTemplate.styles.ts';

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