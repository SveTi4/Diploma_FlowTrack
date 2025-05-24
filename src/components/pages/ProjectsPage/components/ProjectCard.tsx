import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { format, differenceInDays, differenceInHours } from 'date-fns'
import { ru } from 'date-fns/locale'

const Card = styled.div`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({theme}) => theme.colors.border};
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.border};
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    overflow: hidden;

    &:hover {
        transform: translateY(-2px);
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 6px 16px ${({ theme }) => theme.colors.primary}40;
    }
`

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const Description = styled.p<{ isEmpty?: boolean }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
  font-style: ${({ isEmpty }) => isEmpty ? 'italic' : 'normal'};
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: auto;
`

const TimeInfo = styled.div<{ isExpired?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${({ theme, isExpired }) => 
    isExpired 
      ? `${theme.colors.danger}10` 
      : `${theme.colors.primary}10`
  };
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, isExpired }) => 
      isExpired 
        ? `${theme.colors.danger}15` 
        : `${theme.colors.primary}15`
    };
  }
`

const TimeIcon = styled.div<{ isExpired?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ theme, isExpired }) => 
    isExpired 
      ? theme.colors.danger 
      : theme.colors.primary
  };
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  font-size: 14px;
`

const TimeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const TimeLeft = styled.div<{ isExpired?: boolean }>`
  color: ${({ isExpired, theme }) => isExpired ? theme.colors.danger : theme.colors.primary};
  font-weight: 500;
  font-size: 14px;
`

const DeadlineDate = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const NoDeadlineInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${({ theme }) => `${theme.colors.textSecondary}10`};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => `${theme.colors.textSecondary}15`};
  }
`

const NoDeadlineIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  font-size: 14px;
`

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const MetaDot = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.5;
`

const MetaDate = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`

const MetaLabel = styled.span`
  opacity: 0.7;
`

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

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate()
  const isExpired = project.deadline ? new Date(project.deadline) < new Date() : false
  
  const formattedDeadline = project.deadline 
    ? format(new Date(project.deadline), 'd MMMM yyyy', { locale: ru })
    : 'Нет дедлайна'

  const formattedCreatedAt = format(new Date(project.created_at), 'd MMM', { locale: ru })
  const formattedUpdatedAt = format(new Date(project.updated_at), 'd MMM', { locale: ru })

  const getTimeLeft = () => {
    if (!project.deadline) return null
    
    const now = new Date()
    const deadline = new Date(project.deadline)
    const daysLeft = differenceInDays(deadline, now)
    const hoursLeft = differenceInHours(deadline, now)
    
    if (daysLeft < 0) return 'Просрочен'
    if (daysLeft === 0) {
      if (hoursLeft < 0) return 'Просрочен'
      if (hoursLeft === 0) return 'Сейчас'
      return `Осталось ${hoursLeft} ${getHoursWord(hoursLeft)}`
    }
    if (daysLeft === 1) return 'Завтра'
    return `Осталось ${daysLeft} ${getDaysWord(daysLeft)}`
  }

  const getTimeIcon = () => {
    if (!project.deadline) return '∞'
    
    const now = new Date()
    const deadline = new Date(project.deadline)
    const daysLeft = differenceInDays(deadline, now)
    
    if (daysLeft < 0) return '!'
    if (daysLeft === 0) return '0'
    if (daysLeft === 1) return '1'
    return daysLeft > 99 ? '99+' : daysLeft.toString()
  }

  const getDaysWord = (days: number) => {
    const lastDigit = days % 10
    const lastTwoDigits = days % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'дней'
    if (lastDigit === 1) return 'день'
    if (lastDigit >= 2 && lastDigit <= 4) return 'дня'
    return 'дней'
  }

  const getHoursWord = (hours: number) => {
    const lastDigit = hours % 10
    const lastTwoDigits = hours % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'часов'
    if (lastDigit === 1) return 'час'
    if (lastDigit >= 2 && lastDigit <= 4) return 'часа'
    return 'часов'
  }

  return (
    <Card onClick={() => navigate(`/projects/${project.id}`)}>
      <Title>
        {project.name}
        {project.archived && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21M3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6M3 6L5 3H19L21 6M10 10V16M14 10V16" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </Title>
      <Description isEmpty={!project.description}>
        {project.description || 'Нет описания'}
      </Description>
      
      <Meta>
        {project.deadline ? (
          <TimeInfo isExpired={isExpired}>
            <TimeIcon isExpired={isExpired}>
              {getTimeIcon()}
            </TimeIcon>
            <TimeContent>
              <TimeLeft isExpired={isExpired}>
                {getTimeLeft()}
              </TimeLeft>
              <DeadlineDate>
                {formattedDeadline}
              </DeadlineDate>
            </TimeContent>
          </TimeInfo>
        ) : (
          <NoDeadlineInfo>
            <NoDeadlineIcon>
              ∞
            </NoDeadlineIcon>
            <TimeContent>
              <TimeLeft>
                Без дедлайна
              </TimeLeft>
              <DeadlineDate>
                Можно добавить в настройках проекта
              </DeadlineDate>
            </TimeContent>
          </NoDeadlineInfo>
        )}
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