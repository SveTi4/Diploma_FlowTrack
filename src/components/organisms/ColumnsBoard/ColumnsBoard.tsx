import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../../store'
import { PlusIcon, Loader, Button } from '../../atoms'
import { createColumn, deleteColumn, fetchColumns, updateColumn, selectColumnsByProject } from '../../../store/columns/columnsSlice'
import { createTask } from '../../../store/tasks/tasksSlice'
import { EmptyState } from "../../molecules"
import { Droppable } from "react-beautiful-dnd"
import { Column } from './components/Column/Column'
import { BoardHeader, BoardTitle, ColumnsContainer } from './ColumnsBoard.styles'

interface ColumnsBoardProps {
  project_id: number
}

export const ColumnsBoard: React.FC<ColumnsBoardProps> = memo(({ project_id }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, movingColumnId } = useSelector((state: RootState) => state.columns)
  const columns = useSelector((state: RootState) => selectColumnsByProject(state, project_id))

  useEffect(() => {
    dispatch(fetchColumns({ 
      project_id, 
      params: { page: 1, limit: 999 } 
    }))
  }, [project_id, dispatch])

  const handleUpdateColumnName = (columnId: number, newName: string) => {
    dispatch(updateColumn({
      id: columnId,
      data: { name: newName }
    }))
  }

  const handleCreateTask = (columnId: number) => {
    dispatch(createTask({
      name: 'Новая задача',
      column_id: columnId,
      description: '',
      deadline: null
    }))
  }

  if (loading && !movingColumnId) return <Loader size="medium" />
  if (error) return <div>Ошибка: {error}</div>
  if (columns.length === 0) {
    return (
      <EmptyState
        icon={<PlusIcon size={48} />}
        title={"У вас пока нет колонок"}
        description={"Создайте свою первой колонку прямо сейчас!"}
        buttonText="Создать колонку"
        onButtonClick={() => dispatch(createColumn({
          name: 'Новая колонка',
          project_id: project_id
        }))}
      />
    )
  }

  return (
    <div>
      <BoardHeader>
        <BoardTitle>Колонки</BoardTitle>
        <Button
          onClick={() => dispatch(createColumn({
            name: 'Новая колонка',
            project_id: project_id
          }))}
        >
          <PlusIcon size={16} />
          Новая колонка
        </Button>
      </BoardHeader>
      <Droppable droppableId="column" direction="horizontal" type="column">
        {provided => (
          <ColumnsContainer ref={provided.innerRef} {...provided.droppableProps}>
            {columns?.map(column => (
              <Column
                key={column.id}
                column={column}
                onUpdateName={handleUpdateColumnName}
                onDelete={(id) => dispatch(deleteColumn(id))}
                onCreateTask={handleCreateTask}
              />
            ))}
            {provided.placeholder}
          </ColumnsContainer>
        )}
      </Droppable>
    </div>
  )
}) 