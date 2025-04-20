import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Column, Task } from '../../../types/column'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { fetchColumnTasks } from '../../../store/tasks/tasksSlice'

const ColumnContainer = styled.div`
  background: #27282A;
  border: #323336 1px solid;
  border-radius: 12px;
  padding: 20px;
  min-width: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ColumnHeader = styled.div`
  color: ${({ theme }) => theme.colors.light};
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TaskCount = styled.span`
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.5;
  font-size: 14px;
`

const TaskList = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`

const TaskCard = styled.div<{ completed?: boolean }>`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  opacity: ${({ completed }) => completed ? 0.6 : 1};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const TaskTitle = styled.div`
  color: ${({ theme }) => theme.colors.light};
  font-size: 14px;
  margin-bottom: 8px;
`

const TaskDescription = styled.div`
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.7;
  font-size: 12px;
  margin-bottom: 8px;
`

const TaskMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.5;
  font-size: 11px;
`

const LoadingText = styled.div`
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.7;
  text-align: center;
  padding: 20px;
`

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  text-align: center;
  padding: 20px;
  font-size: 12px;
`

interface TaskColumnProps {
  column: Column
}

export const TaskColumn = ({ column }: TaskColumnProps) => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.tasks.items[column.id] || [])
  const loading = useAppSelector((state) => state.tasks.loading[column.id])
  const error = useAppSelector((state) => state.tasks.error[column.id])

  useEffect(() => {
    dispatch(fetchColumnTasks({ columnId: column.id }))
  }, [dispatch, column.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <ColumnContainer>
      <ColumnHeader>
        {column.name}
        <TaskCount>{tasks.length}</TaskCount>
      </ColumnHeader>
      <TaskList>
        {loading ? (
          <LoadingText>Загрузка задач...</LoadingText>
        ) : error ? (
          <ErrorText>{error}</ErrorText>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} completed={task.status}>
              <TaskTitle>{task.name}</TaskTitle>
              {task.description && (
                <TaskDescription>{task.description}</TaskDescription>
              )}
              <TaskMeta>
                <span>Срок: {formatDate(task.deadline)}</span>
                <span>{task.status ? 'Завершено' : 'В работе'}</span>
              </TaskMeta>
            </TaskCard>
          ))
        )}
      </TaskList>
    </ColumnContainer>
  )
} 