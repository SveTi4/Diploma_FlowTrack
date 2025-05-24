import React, { memo } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { TasksBoard } from '../../../TasksBoard/TasksBoard'
import { IconButton } from '../../../../atoms/IconButton/IconButton'
import { PlusIcon } from '../../../../atoms/Icon/icons'
import { EditableTitleComponent } from '../../../../molecules/EditableTitle/EditableTitle'

const Column = styled.div`
  width: 360px;
  flex: 0 0 360px;
  height: fit-content;
  max-height: 75vh;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`

const ColumnHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.medium};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.medium};
`

const ColumnTitleWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const AddTaskButton = styled.button`
  background: none;
  display: flex;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 48px;
  align-items: center;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
  }
`

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

export const ColumnComponent: React.FC<ColumnProps> = memo(({
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
        <Column 
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
              <EditableTitleComponent
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
        </Column>
      )}
    </Draggable>
  )
})
