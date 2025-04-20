import { useEffect } from 'react'
import styled from 'styled-components'
import { Column } from '../../../types/column'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { fetchColumnTasks, deleteTask } from '../../../store/tasks/tasksSlice'

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
  position: relative;

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

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.danger};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }
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

  const handleDeleteTask = (taskId: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      dispatch(deleteTask({ taskId, columnId: column.id }))
    }
  }

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
              <DeleteButton onClick={() => handleDeleteTask(task.id)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M3 7H21M17 7V4C17 3.44772 16.5523 3 16 3H8C7.44772 3 7 3.44772 7 4V7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </DeleteButton>
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