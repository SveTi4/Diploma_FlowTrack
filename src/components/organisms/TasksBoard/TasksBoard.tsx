import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { deleteTask, fetchTasks, updateTask } from '../../../store/tasks/tasksSlice'
import { Loader } from '../../atoms/Loader/Loader'
import { TaskCard } from './components/Task/Task'
import { Droppable } from "react-beautiful-dnd"
import { TasksContainer } from './TasksBoard.styles'

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

  if (loadingByColumn[column_id] && !columnTasks) return <Loader size="medium" />
  if (errorByColumn[column_id]) return <div>Ошибка: {errorByColumn[column_id]}</div>
  if (!columnTasks?.items) return null

  return (
    <Droppable type="task" droppableId={String(column_id)}>
      {(provided) => (
          <TasksContainer ref={provided.innerRef} {...provided.droppableProps}>
            {columnTasks.items.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                index={task.position}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
              />
            ))}
            {provided.placeholder}
          </TasksContainer>
      )}
    </Droppable>
  )
}   