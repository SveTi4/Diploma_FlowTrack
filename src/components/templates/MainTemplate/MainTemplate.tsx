import { Sidebar } from '../../organisms/Sidebar/Sidebar'
import {ThemeToggle} from "../../atoms";
import { Container, Content, ThemeToggleWrapper } from './MainTemplate.styles.ts';

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
      <ThemeToggleWrapper>
        <ThemeToggle />
      </ThemeToggleWrapper>
    </Container>
  )
} 