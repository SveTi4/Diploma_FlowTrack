import React, { useState } from 'react'
import {
  CalendarIcon,
  IconButton,
  TaskStatus,
  CreatedAtIcon,
  UpdatedAtIcon,
  DescriptionIcon
} from '../../../../atoms'
import { Task } from "../../../../../api/services"
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Draggable } from "react-beautiful-dnd"
import { usePanel } from '../../../../../contexts/PanelContext'
import { EditableTitle, EditableDescription, EditableDate, Section } from '../../../../molecules'
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
              <CalendarIcon size={16} />
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
              <CreatedAtIcon size={16} />
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
              <UpdatedAtIcon size={16} />
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
              <DescriptionIcon size={16} />
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
              {(task.description || task.deadline) && (
                <TaskContent>
                  {task.description && <TaskDescription>Описание: {task.description}</TaskDescription>}
                  {task.deadline && <TaskDescription>Дедлайн: {formattedDeadline}</TaskDescription>}
                </TaskContent>
              )}
            </TaskInfo>
          </TaskWrapper>
        </div>
      )}
    </Draggable>
  )
} 