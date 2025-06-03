import {
  Container,
  IconContainer,
  Title,
  Description,
  Button
} from './EmptyState.styles'

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