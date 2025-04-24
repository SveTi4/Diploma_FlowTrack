import React from 'react'
import styled from 'styled-components'
import { TrashIcon } from '../../../../atoms/Icon/icons'
import { TasksBoard } from '../../../TasksBoard/TasksBoard'
import { EditableTitleComponent } from '../EditableTitle/EditableTitle'

const ColumnWrapper = styled.div`
  width: 360px;
  flex: 0 0 360px;
  height: fit-content;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
`

const ColumnHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ColumnTitleWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const DeleteColumnButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.error};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }
`

const AddTaskButton = styled.button`
  background: none;
  display: flex;
  justify-content: center;
  padding: 0;
  width: 100%;
  height: 48px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundHover};
  }
`

const ColumnContent = styled.div`
  padding: 16px;
`

interface ColumnProps {
  id: number;
  name: string;
  onDelete: (id: number) => void;
  onUpdateName: (id: number, newName: string) => void;
}

export const Column: React.FC<ColumnProps> = ({
  id,
  name,
  onDelete,
  onUpdateName
}) => {
  return (
    <ColumnWrapper>
      <ColumnHeader>
        <ColumnTitleWrapper>
          <EditableTitleComponent
            value={name}
            onSave={(newName) => onUpdateName(id, newName)}
          />
        </ColumnTitleWrapper>
        <DeleteColumnButton onClick={() => onDelete(id)}>
          <TrashIcon size={16} />
        </DeleteColumnButton>
      </ColumnHeader>
      <AddTaskButton>
        <TrashIcon size={24} />
        Add task
      </AddTaskButton>
      <ColumnContent>
        <TasksBoard column_id={id} />
      </ColumnContent>
    </ColumnWrapper>
  )
} 