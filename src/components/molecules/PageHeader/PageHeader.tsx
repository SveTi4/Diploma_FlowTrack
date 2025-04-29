import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  font-size: 20px;

  &:hover {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.8;
  }
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  font-weight: 500;
`

const Actions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

interface PageHeaderProps {
  title: string
  showBackButton?: boolean
  children?: ReactNode
}

export const PageHeader = ({ 
  title, 
  showBackButton,
  children
}: PageHeaderProps) => {
  const navigate = useNavigate()

  return (
    <Container>
      <TitleSection>
        {showBackButton && (
          <BackButton onClick={() => navigate(-1)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </BackButton>
        )}
        <Title>{title}</Title>
      </TitleSection>
      
      {children && <Actions>{children}</Actions>}
    </Container>
  )
} 