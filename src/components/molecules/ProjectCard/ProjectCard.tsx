import styled from 'styled-components'
import { Project } from '../../../types/project'
import { ProgressBarComponent } from '../../atoms/ProgressBar/ProgressBar'
import { getTimeLeft } from '../../../utils/time'

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

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const timeLeft = getTimeLeft(project.deadline)
  const progress = 50 // Статичный прогресс

  return (
    <Card onClick={onClick}>
      <ProjectName>{project.name}</ProjectName>
      <Description>{project.description}</Description>
      <ProgressBarComponent progress={progress} timeLeft={timeLeft} />
    </Card>
  )
} 