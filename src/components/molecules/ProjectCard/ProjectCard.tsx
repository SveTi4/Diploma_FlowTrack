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

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.light};
  margin-bottom: 16px;
`

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

// Временные данные для демонстрации
const getTempProjectData = (project: Project) => ({
  description: 'Описание проекта будет добавлено позже...',
  progress: Math.floor(Math.random() * 100),
  status: 'В работе',
  timeLeft: `${Math.floor(Math.random() * 30) + 1} дней`
})

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  // Добавляем временные данные к проекту
  const tempData = getTempProjectData(project)

  return (
    <Card onClick={onClick}>
      <StatusBadge>{tempData.status}</StatusBadge>
      <ProjectName>{project.Name}</ProjectName>
      <Description>{tempData.description}</Description>
      <ProgressContainer>
        <ProgressInfo>
          <span>Прогресс {tempData.progress}%</span>
          <span>Осталось: {tempData.timeLeft}</span>
        </ProgressInfo>
        <ProgressBar progress={tempData.progress} />
      </ProgressContainer>
    </Card>
  )
} 