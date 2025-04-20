import styled from 'styled-components'
import { Project } from '../../../types/project'

const Card = styled.div`
  background: #27282A;
  border: #323336 1px solid;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 0 32px 1px rgba(255, 255, 255, 0.06);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-4px) scale(1.02);
    //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`

const ProjectName = styled.h3`
  color: ${({ theme }) => theme.colors.light};
  font-size: 18px;
  margin: 0 0 16px 0;
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.7;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 20px 0;
`

const ProgressContainer = styled.div`
  margin-top: 8px;
`

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.7;
  font-size: 12px;
`

const ProgressBar = styled.div<{ progress: number }>`
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ progress }) => progress}%;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
    transition: width 0.3s ease;
  }
`

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

const getTimeLeft = (deadline: string | null): string => {
  if (!deadline) return 'Дедлайн не установлен'
  
  const deadlineDate = new Date(deadline)
  const now = new Date()
  
  if (deadlineDate < now) return 'Срок истек'
  
  const diffTime = deadlineDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Осталось менее дня'
  if (diffDays === 1) return 'Остался 1 день'
  if (diffDays < 7) return `Осталось ${diffDays} дня`
  if (diffDays < 30) return `Осталось ${Math.ceil(diffDays / 7)} недели`
  
  return `Осталось ${Math.ceil(diffDays / 30)} месяца`
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const timeLeft = getTimeLeft(project.deadline)
  const progress = 50 // Статичный прогресс

  return (
    <Card onClick={onClick}>
      <ProjectName>{project.name}</ProjectName>
      <Description>{project.description}</Description>
      <ProgressContainer>
        <ProgressInfo>
          <span>Прогресс {progress}%</span>
          <span>{timeLeft}</span>
        </ProgressInfo>
        <ProgressBar progress={progress} />
      </ProgressContainer>
    </Card>
  )
} 