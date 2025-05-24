import React, { useState } from 'react'
import styled from 'styled-components'
import { IconButton } from '../../../../atoms/IconButton/IconButton.tsx'
import { Task } from "../../../../../api/services"
import { TaskStatus } from '../../../../atoms/TaskStatus/TaskStatus'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Draggable } from "react-beautiful-dnd"
import { usePanel } from '../../../../../contexts/PanelContext'
import { EditableTitle } from '../../../../molecules/EditableTitle/EditableTitle.tsx'
import { EditableDescription } from '../../../../molecules/EditableDescription/EditableDescription'
import { EditableDate } from '../../../../molecules/EditableDate/EditableDate'
import { Section, SectionTitle } from '../../../../molecules/Section/Section'

const TaskWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    &::before {
      opacity: 0.1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const TaskInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const TaskHeader = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.surface};
`

const TaskTitleWrapper = styled.div`
  flex: 1;
`

const TaskActions = styled.div`
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${TaskWrapper}:hover & {
    opacity: 1;
  }
`

const TaskContent = styled.div`
  padding: 0 16px 16px;
  background: ${({ theme }) => theme.colors.surface};
`

const TaskDescription = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 60px;
    height: 100%;
    background: linear-gradient(to right, transparent, ${({ theme }) => theme.colors.surface});
  }
`

const TaskTitle = styled.h3`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.4;
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

interface TaskProps {
  task: Task;
  index: number
  onDelete: (id: number) => void;
  onUpdate?: (id: number, data: { name?: string; description?: string; status?: boolean; deadline?: string | null }) => void;
}

export const TaskCard: React.FC<TaskProps> = ({
  task,
  index,
  onDelete,
  onUpdate
}) => {
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const { openPanel, updatePanel } = usePanel();

  const renderPanelContent = (currentTask: typeof task) => (
    <>
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
              value={currentTask.description || ''}
              onSave={(newDescription) => {
                onUpdate?.(currentTask.id, { description: newDescription });
                updatePanel({
                  content: renderPanelContent({ ...currentTask, description: newDescription })
                });
              }}
              placeholder="Добавьте описание задачи..."
            />
          </DescriptionCard>

          <DeadlineCard>
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
              value={currentTask.deadline}
              onSave={(newDeadline) => {
                onUpdate?.(currentTask.id, { deadline: newDeadline });
                updatePanel({
                  content: renderPanelContent({ ...currentTask, deadline: newDeadline })
                });
              }}
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
            <CardValue>{format(new Date(currentTask.created_at), 'd MMMM yyyy', { locale: ru })}</CardValue>
          </InfoCard>

          <InfoCard>
            <CardHeader>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00001C14.6667 4.31811 11.6819 1.33334 8 1.33334C4.3181 1.33334 1.33333 4.31811 1.33333 8.00001C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 4V8L10.6667 9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Изменена
            </CardHeader>
            <CardValue>{format(new Date(currentTask.updated_at), 'd MMMM yyyy', { locale: ru })}</CardValue>
          </InfoCard>
        </InfoCards>
      </Section>

      <Section>
        <SectionTitle>Подзадачи</SectionTitle>
        <SubtasksList>
          <SubtaskItem>
            <TaskStatus status={false} onStatusChange={() => {}} />
            <SubtaskName>Пример подзадачи</SubtaskName>
          </SubtaskItem>
        </SubtasksList>
      </Section>
    </>
  );

  const handleClick = () => {
    openPanel({
      type: 'task',
      title: (
        <EditableTitle
          value={task.name}
          onSave={(newName) => {
            onUpdate?.(task.id, { name: newName });
            updatePanel({
              title: (
                <EditableTitle
                  value={newName}
                  onSave={(newName) => onUpdate?.(task.id, { name: newName })}
                />
              )
            });
          }}
        />
      ),
      content: renderPanelContent(task)
    });
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  const handleStatusChange = async () => {
    setIsStatusUpdating(true);
    try {
      await onUpdate?.(task.id, { status: !task.status });
    } finally {
      setIsStatusUpdating(false);
    }
  };

  const formattedDeadline = task.deadline 
    ? format(new Date(task.deadline), 'd MMMM yyyy', { locale: ru })
    : 'Нет дедлайна'

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          <TaskWrapper>
            <TaskStatus
              status={task.status}
              onStatusChange={handleStatusChange}
              isLoading={isStatusUpdating}
            />

            <TaskInfo onClick={handleClick}>
              <TaskHeader>
                <TaskTitleWrapper>
                  <TaskTitle>{task.name}</TaskTitle>
                </TaskTitleWrapper>
                <TaskActions>
                  <IconButton onClick={handleDeleteClick} />
                </TaskActions>
              </TaskHeader>
              {task.description && (
                <TaskContent>
                  <TaskDescription>{task.description}</TaskDescription>
                  <TaskDescription>Дедлайн: {formattedDeadline}</TaskDescription>
                </TaskContent>
              )}
            </TaskInfo>
          </TaskWrapper>
        </div>
      )}
    </Draggable>
  )
} 