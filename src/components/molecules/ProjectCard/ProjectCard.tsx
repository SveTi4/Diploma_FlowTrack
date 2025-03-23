import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const Title = styled.h3`
  color: white;
  font-size: 16px;
  margin-bottom: 12px;
`

const Description = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin-bottom: 16px;
  line-height: 1.4;
`

const ProgressContainer = styled.div`
  margin-top: 8px;
`

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
`

const ProgressBar = styled.div<{ progress: number }>`
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ progress }) => progress}%;
    background: #007AFF;
    transition: width 0.3s ease;
  }
`

interface ProjectCardProps {
  id: number
  title: string
  description: string
  progress: number
  timeLeft: string
}

export const ProjectCard = ({ 
  id,
  title, 
  description, 
  progress, 
  timeLeft
}: ProjectCardProps) => {
  const navigate = useNavigate()

  return (
    <Card onClick={() => navigate(`/projects/${id}`)}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <ProgressContainer>
        <ProgressInfo>
          <span>Прогресс</span>
          <span>{timeLeft}</span>
        </ProgressInfo>
        <ProgressBar progress={progress} />
      </ProgressContainer>
    </Card>
  )
} 