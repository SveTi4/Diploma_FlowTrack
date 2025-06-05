import { useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'
import {
  Container,
  TitleSection,
  BackButton,
  Title,
  Actions
} from './PageHeader.styles'
import {BackIcon} from "../../atoms";

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
            <BackIcon size={24} color={"currentColor"} />
          </BackButton>
        )}
        <Title>{title}</Title>
      </TitleSection>
      
      {children && <Actions>{children}</Actions>}
    </Container>
  )
} 