import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { deleteTask, fetchTasks, updateTask } from '../../../store/tasks/tasksSlice'
import { Loader } from '../../atoms/Loader/Loader'
import { Task } from './components/Task/Task'

const TasksContainer = styled.div`
  width: 100%;
`

interface TasksBoardProps {
  column_id: number
}

export const TasksBoard: React.FC<TasksBoardProps> = ({ column_id }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { tasksByColumn, loading, error } = useSelector((state: RootState) => state.tasks)
  const columnTasks = tasksByColumn[column_id]

  useEffect(() => {
    if (column_id) {
      dispatch(fetchTasks({
        column_id,
        params: { page: 1, limit: 10 }
      }))
    }
  }, [column_id, dispatch])

  const handleDeleteTask = (taskId: number) => {
    dispatch(deleteTask({ id: taskId, column_id }))
  }

  const handleUpdateTask = (taskId: number, data: { name?: string; description?: string }) => {
    dispatch(updateTask({ id: taskId, data: { ...data, column_id } }))
  }

  if (loading && !columnTasks) return <Loader size="medium" />
  if (error) return <div>Ошибка: {error}</div>
  if (!columnTasks?.items) return null

  return (
    <TasksContainer>
      {columnTasks.items.map(task => (
        <Task
          key={task.id}
          id={Number(task.id)}
          name={task.name}
          description={task.description}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />
      ))}
    </TasksContainer>
  )
}   