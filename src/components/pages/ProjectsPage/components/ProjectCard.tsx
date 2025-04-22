import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const Card = styled.div`
  background: #27282A;
  border: 1px solid #323336;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
    box-shadow: 0 0 32px 1px rgba(255, 255, 255, 0.06);

  &:hover {
    transform: translateY(-2px);
    border-color: #3C3D42;
  }
`

const Title = styled.h3`
  color: white;
  font-size: 18px;
  margin-bottom: 8px;
`

const Description = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Meta = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const Deadline = styled.div<{ isExpired?: boolean }>`
  color: ${({ isExpired }) => isExpired ? '#FF6B6B' : 'rgba(255, 255, 255, 0.6)'};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`

interface Project {
  id: number
  name: string
  description: string
  deadline: string | null
}

interface ProjectCardProps {
  project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate()
  const isExpired = project.deadline ? new Date(project.deadline) < new Date() : false
  
  const formattedDeadline = project.deadline 
    ? format(new Date(project.deadline), 'd MMMM yyyy', { locale: ru })
    : 'Нет дедлайна'

  return (
    <Card onClick={() => navigate(`/projects/${project.id}`)}>
      <Title>{project.name}</Title>
      <Description>{project.description}</Description>
      
      <Meta>
        <Deadline isExpired={isExpired}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {formattedDeadline}
        </Deadline>
      </Meta>
    </Card>
  )
}