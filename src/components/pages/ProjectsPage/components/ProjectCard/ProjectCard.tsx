import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import {
  Card,
  Title,
  Description,
  Meta,
  MetaInfo,
  MetaDot,
  MetaDate,
  MetaLabel,
  TimeBlock,
  TimeIcon,
  TimeText,
  TimeDate
} from './ProjectCard.styles'
import { useTimeInfo } from '../../../../../hooks/useTimeInfo'
import { ArchiveIcon } from '../../../../atoms/Icon/icons'

// Types
interface Project {
  id: number
  name: string
  description: string
  deadline: string | null
  created_at: string
  updated_at: string
  archived: boolean
}

interface ProjectCardProps {
  project: Project
}

// Main component
export const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate()
  const { formattedDate, timeLeft, timeIcon, isExpired } = useTimeInfo(project.deadline)

  const formattedCreatedAt = format(new Date(project.created_at), 'd MMM', { locale: ru })
  const formattedUpdatedAt = format(new Date(project.updated_at), 'd MMM', { locale: ru })

  return (
    <Card onClick={() => navigate(`/projects/${project.id}`)}>
      <Title>
        {project.name}
        {project.archived && <ArchiveIcon size={16} />}
      </Title>
      <Description isEmpty={!project.description}>
        {project.description || 'Нет описания'}
      </Description>
      
      <Meta>
        <TimeBlock isExpired={isExpired}>
          <TimeIcon isExpired={isExpired}>{timeIcon}</TimeIcon>
          <TimeText>
            {timeLeft}
            <TimeDate>{formattedDate}</TimeDate>
          </TimeText>
        </TimeBlock>
        <MetaInfo>
          <MetaDate>
            <MetaLabel>Создан:</MetaLabel>
            {formattedCreatedAt}
          </MetaDate>
          <MetaDot />
          <MetaDate>
            <MetaLabel>Изменен:</MetaLabel>
            {formattedUpdatedAt}
          </MetaDate>
        </MetaInfo>
      </Meta>
    </Card>
  )
}