import React, { useState } from 'react'
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
import { Section } from '../../../../molecules/Section/Section'
import {
  TaskWrapper,
  TaskInfo,
  TaskHeader,
  TaskTitleWrapper,
  TaskActions,
  TaskContent,
  TaskDescription,
  TaskTitle,
  InfoCards,
  InfoCard,
  DescriptionCard,
  DeadlineCard,
  CardHeader,
  CardValue
} from './Task.styles'

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
              onSave={async (newDeadline) => {
                await onUpdate?.(currentTask.id, { deadline: newDeadline });
                const updatedTask = { ...currentTask, deadline: newDeadline };
                updatePanel({
                  content: renderPanelContent(updatedTask)
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
            <CardValue>
              {(() => {
                console.log('Created at:', currentTask.created_at);
                const date = new Date(currentTask.created_at);
                const utcDate = new Date(Date.UTC(
                  date.getUTCFullYear(),
                  date.getUTCMonth(),
                  date.getUTCDate()
                ));
                return format(utcDate, 'd MMMM yyyy', { locale: ru });
              })()}
            </CardValue>
          </InfoCard>

          <InfoCard>
            <CardHeader>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00001C14.6667 4.31811 11.6819 1.33334 8 1.33334C4.3181 1.33334 1.33333 4.31811 1.33333 8.00001C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 4V8L10.6667 9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Изменена
            </CardHeader>
            <CardValue>
              {(() => {
                console.log('Updated at:', currentTask.updated_at);
                const date = new Date(currentTask.updated_at);
                const utcDate = new Date(Date.UTC(
                  date.getUTCFullYear(),
                  date.getUTCMonth(),
                  date.getUTCDate()
                ));
                return format(utcDate, 'd MMMM yyyy', { locale: ru });
              })()}
            </CardValue>
          </InfoCard>
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
              onSave={async (newDescription) => {
                await onUpdate?.(currentTask.id, { description: newDescription });
                const updatedTask = { ...currentTask, description: newDescription };
                updatePanel({
                  content: renderPanelContent(updatedTask)
                });
              }}
              placeholder="Добавьте описание задачи..."
            />
          </DescriptionCard>
        </InfoCards>
      </Section>
    </>
  );

  const handleClick = () => {
    openPanel({
      type: 'task',
      title: (
        <EditableTitle
          value={task.name}
          onSave={async (newName) => {
            await onUpdate?.(task.id, { name: newName });
            const updatedTask = { ...task, name: newName };
            updatePanel({
              title: (
                <EditableTitle
                  value={newName}
                  onSave={async (newName) => {
                    await onUpdate?.(task.id, { name: newName });
                    const updatedTask = { ...task, name: newName };
                    updatePanel({
                      title: (
                        <EditableTitle
                          value={newName}
                          onSave={(newName) => onUpdate?.(task.id, { name: newName })}
                        />
                      ),
                      content: renderPanelContent(updatedTask)
                    });
                  }}
                />
              ),
              content: renderPanelContent(updatedTask)
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
      const updatedTask = { ...task, status: !task.status };
      updatePanel({
        content: renderPanelContent(updatedTask)
      });
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