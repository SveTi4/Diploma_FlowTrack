import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const BackButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  font-size: 20px;

  &:hover {
    color: white;
  }
`

const Title = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: 500;
`

const Actions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

const SearchInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  color: white;
  width: 240px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`

const CreateButton = styled.button`
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #0066CC;
  }
`

interface PageHeaderProps {
  title: string
  showBackButton?: boolean
  onSearch?: (value: string) => void
  onCreateClick?: () => void
}

export const PageHeader = ({ 
  title, 
  showBackButton,
  onSearch, 
  onCreateClick 
}: PageHeaderProps) => {
  const navigate = useNavigate()

  return (
    <Container>
      <TitleSection>
        {showBackButton && (
          <BackButton onClick={() => navigate(-1)}>
            ←
          </BackButton>
        )}
        <Title>{title}</Title>
      </TitleSection>
      
      <Actions>
        {onSearch && (
          <SearchInput 
            placeholder="Поиск проекта..." 
            onChange={(e) => onSearch(e.target.value)}
          />
        )}
        {onCreateClick && (
          <CreateButton onClick={onCreateClick}>
            + Новый проект
          </CreateButton>
        )}
      </Actions>
    </Container>
  )
} 