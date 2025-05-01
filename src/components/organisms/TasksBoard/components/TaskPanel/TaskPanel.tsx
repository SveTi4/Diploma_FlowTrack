import React from 'react'
import styled from 'styled-components'
import { SidePanel } from '../../../SidePanel/SidePanel'
import { EditableTitleComponent } from '../../../../molecules/EditableTitle/EditableTitle'
import { EditableDescription } from '../../../../molecules/EditableDescription/EditableDescription'
import { EditableDate } from '../../../../molecules/EditableDate/EditableDate'
import { TaskStatus } from '../../../../atoms/TaskStatus/TaskStatus'
import { Task } from '../../../../../api/services'
import { formatDate } from '../../../../../utils/dateUtils'

const Section = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`

const InfoCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.medium};
`

const InfoCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.medium};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`

const DescriptionCard = styled(InfoCard)`
  flex-direction: column;
  grid-column: 1 / -1;
`

const DeadlineCard = styled(InfoCard)`
  grid-column: 1 / -1;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`

const CardValue = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`

const SubtasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`

const SubtaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`

const SubtaskName = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`

interface TaskPanelProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  onUpdateTask?: (id: number, data: { name?: string; description?: string; deadline?: string | null; status?: boolean }) => void;
}

export const TaskPanel: React.FC<TaskPanelProps> = ({
  isOpen,
  onClose,
  task,
  onUpdateTask
}) => {
  if (!task) return null;

  const handleNameUpdate = (newName: string) => {
    onUpdateTask?.(task.id, { name: newName });
  };

  const handleDescriptionUpdate = (newDescription: string) => {
    onUpdateTask?.(task.id, { description: newDescription });
  };

  const handleDeadlineUpdate = (newDeadline: string | null) => {
    onUpdateTask?.(task.id, { deadline: newDeadline });
  };

  return (
    <SidePanel
      isOpen={isOpen}
      title={
        <EditableTitleComponent
          value={task.name}
          onSave={handleNameUpdate}
        />
      }
      onClose={onClose}
    >
      <Section>
        <InfoCards>
          <DescriptionCard>
            <CardHeader>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 2H2.66667C2.29848 2 2 2.29848 2 2.66667V13.3333C2 13.7015 2.29848 14 2.66667 14H13.3333C13.7015 14 14 13.7015 14 13.3333V2.66667C14 2.29848 13.7015 2 13.3333 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.33333 2V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 5.33334H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Описание
            </CardHeader>
            <EditableDescription
              value={task.description || ''}
              onSave={handleDescriptionUpdate}
              placeholder="Добавьте описание задачи..."
            />
          </DescriptionCard>

          <DeadlineCard >
            <CardHeader>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.6667 1.33334V4.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.33333 1.33334V4.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 6.66667H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Дедлайн
            </CardHeader>
            <EditableDate
              value={task.deadline}
              onSave={handleDeadlineUpdate}
              placeholder="Установите дедлайн"
            />
          </DeadlineCard>

          <InfoCard>
            <CardHeader>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00001C14.6667 4.31811 11.6819 1.33334 8 1.33334C4.3181 1.33334 1.33333 4.31811 1.33333 8.00001C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 4V8L10.6667 9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Создана
            </CardHeader>
            <CardValue>{formatDate(task.created_at, 'short2', 'Не указано')}</CardValue>
          </InfoCard>

          <InfoCard>
            <CardHeader>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00001C14.6667 4.31811 11.6819 1.33334 8 1.33334C4.3181 1.33334 1.33333 4.31811 1.33333 8.00001C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 4V8L10.6667 9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Изменена
            </CardHeader>
            <CardValue>{formatDate(task.updated_at, 'short2', 'Не указано')}</CardValue>
          </InfoCard>
        </InfoCards>
      </Section>

      <Section>
        <SectionTitle>Подзадачи</SectionTitle>
        <SubtasksList>
          {/* Здесь будет список подзадач */}
          <SubtaskItem>
            <TaskStatus status={false} onStatusChange={() => {}} />
            <SubtaskName>Пример подзадачи</SubtaskName>
          </SubtaskItem>
        </SubtasksList>
      </Section>
    </SidePanel>
  );
}; 