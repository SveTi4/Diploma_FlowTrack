import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 48px;
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.6;
  text-align: center;
`

const IconContainer = styled.div`
  margin-bottom: 24px;
  svg {
    width: 48px;
    height: 48px;
    stroke: currentColor;
  }
`

const Title = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
`

const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  max-width: 400px;
  margin-bottom: 24px;
`

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }
`

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  buttonText?: string
  onButtonClick?: () => void
  buttonIcon?: React.ReactNode
}

export const EmptyState = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  onButtonClick, 
  buttonIcon 
}: EmptyStateProps) => {
  return (
    <Container>
      {icon && <IconContainer>{icon}</IconContainer>}
      <Title>{title}</Title>
      <Description>{description}</Description>
      {buttonText && onButtonClick && (
        <Button onClick={onButtonClick}>
          {buttonIcon}
          {buttonText}
        </Button>
      )}
    </Container>
  )
} 