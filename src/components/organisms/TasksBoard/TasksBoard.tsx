import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { deleteTask, fetchTasks, updateTask } from '../../../store/tasks/tasksSlice'
import { Loader } from '../../atoms/Loader/Loader'
import { TaskCard } from './components/Task/Task'
import { Droppable } from "react-beautiful-dnd";

const TasksContainer = styled.div`
  width: 100%;
  padding: 16px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

interface TasksBoardProps {
  column_id: number
}

export const TasksBoard: React.FC<TasksBoardProps> = ({ column_id }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { tasksByColumn, loadingByColumn, errorByColumn } = useSelector((state: RootState) => state.tasks)
  const columnTasks = tasksByColumn[column_id]

  useEffect(() => {
    if (column_id) {
      dispatch(fetchTasks({
        column_id,
        params: { page: 1, limit: 999 }
      }))
    }
  }, [column_id, dispatch])

  const handleDeleteTask = (taskId: number) => {
    dispatch(deleteTask({ id: taskId, column_id }))
  }

  const handleUpdateTask = async (taskId: number, data: { name?: string; description?: string; status?: boolean }) => {
    return dispatch(updateTask({ id: taskId, data: { ...data, column_id } })).unwrap()
  }

  if (loadingByColumn[column_id] || !columnTasks) return <Loader size="medium" />
  if (errorByColumn[column_id]) return <div>Ошибка: {errorByColumn[column_id]}</div>
  if (!columnTasks?.items) return null

  return (
    <Droppable droppableId={String(column_id)}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <TasksContainer>
            {columnTasks.items.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
              />
            ))}
          </TasksContainer>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}   