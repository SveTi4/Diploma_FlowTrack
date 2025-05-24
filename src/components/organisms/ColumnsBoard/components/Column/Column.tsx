import React, { memo } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { TasksBoard } from '../../../TasksBoard/TasksBoard'
import { IconButton } from '../../../../atoms/IconButton/IconButton'
import { PlusIcon } from '../../../../atoms/Icon/icons'
import { EditableTitle } from '../../../../molecules/EditableTitle/EditableTitle.tsx'
import { ColumnWrapper, ColumnHeader, ColumnTitleWrapper, AddTaskButton } from './Column.styles'

interface ColumnProps {
  column: {
    id: string | number
    name: string
    position: number
  }
  onUpdateName: (id: number, newName: string) => void
  onDelete: (id: number) => void
  onCreateTask: (columnId: number) => void
}

export const Column: React.FC<ColumnProps> = memo(({
  column,
  onUpdateName,
  onDelete,
  onCreateTask
}) => {
  return (
    <Draggable 
      key={column.id.toString()} 
      draggableId={column.id.toString()} 
      index={column.position - 1}
    >
      {(provided, snapshot) => (
        <ColumnWrapper
          ref={provided.innerRef} 
          {...provided.draggableProps} 
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.8 : 1
          }}
        >
          <ColumnHeader>
            <ColumnTitleWrapper>
              <EditableTitle
                value={column.name || 'Без названия'}
                onSave={(newName: string) => onUpdateName(Number(column.id), newName)}
              />
            </ColumnTitleWrapper>
            <IconButton onClick={() => onDelete(Number(column.id))} />
          </ColumnHeader>
          <AddTaskButton onClick={() => onCreateTask(Number(column.id))}>
            <PlusIcon size={16} />
            Добавить задачу
          </AddTaskButton>

          <TasksBoard column_id={Number(column.id)} />
        </ColumnWrapper>
      )}
    </Draggable>
  )
})
