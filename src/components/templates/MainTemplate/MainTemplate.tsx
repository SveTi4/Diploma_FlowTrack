import styled from 'styled-components'
import { Sidebar } from '../../organisms/Sidebar/Sidebar'

const Container = styled.div`
    display: flex;
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
`

const Content = styled.main`
    flex: 1;
    background: ${({ theme }) => theme.colors.background};
    height: 100vh;
    overflow-y: scroll;

    /* Стилизация скроллбара */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.colors.surface};
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.border};
        border-radius: ${({ theme }) => theme.borderRadius.small};
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.surfaceHover};
    }
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