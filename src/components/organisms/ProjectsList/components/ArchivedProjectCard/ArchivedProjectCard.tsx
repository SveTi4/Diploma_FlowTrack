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
  TimeDate,
  HighlightedText,
  CardHeader,
  CardContent,
  CardFooter,
  CardActions
} from './ArchivedProjectCard.styles'
import { useTimeInfo } from '../../../../../hooks/useTimeInfo'
import { IconButton } from '../../../../atoms/IconButton/IconButton'

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

interface ArchivedProjectCardProps {
  project: Project
  searchQuery?: string
  onRestore: (project: Project) => void
  onDelete: (project: Project) => void
}

const highlightMatch = (text: string, query: string) => {
  if (!query) return text

  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() ? 
      <HighlightedText key={i}>{part}</HighlightedText> : 
      part
  )
}

// Main component
export const ArchivedProjectCard = ({ 
  project, 
  searchQuery = '', 
  onRestore, 
  onDelete 
}: ArchivedProjectCardProps) => {
  const { formattedDate, timeLeft, timeIcon, isExpired } = useTimeInfo(project.deadline)

  const formattedCreatedAt = format(new Date(project.created_at), 'd MMM', { locale: ru })
  const formattedUpdatedAt = format(new Date(project.updated_at), 'd MMM', { locale: ru })

  const handleRestore = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRestore(project)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(project)
  }

  return (
    <Card>
      <CardHeader>
        <Title>
          {highlightMatch(project.name, searchQuery)}
        </Title>
        <CardActions>
          <IconButton
            type="reload"
            onClick={handleRestore}
            size={16}
          />
          <IconButton
            type="delete"
            onClick={handleDelete}
            size={16}
          />
        </CardActions>
      </CardHeader>
      <CardContent>
        <Description isEmpty={!project.description}>
          {project.description || 'Нет описания'}
        </Description>
      </CardContent>
      <CardFooter>
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
      </CardFooter>
    </Card>
  )
} 