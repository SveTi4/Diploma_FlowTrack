import React, { useEffect, useState, KeyboardEvent } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { PlusIcon } from '../../atoms/Icon/icons'
import { createColumn, deleteColumn, fetchColumns, updateColumn } from '../../../store/columns/columnsSlice'
import { AppDispatch } from '../../../store'
import { Loader } from "../../atoms/Loader/Loader.tsx"
import { TasksBoard } from '../TasksBoard/TasksBoard'
import { createTask } from '../../../store/tasks/tasksSlice'
import { IconButton } from '../../atoms/IconButton/IconButton.tsx'
import {Button} from "../../atoms/Button/Button.tsx";
import {EmptyState} from "../../molecules/EmptyState/EmptyState.tsx";

const BoardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const BoardTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

const ColumnsContainer = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px 0;
  overflow-x: auto;
  width: 100%;
  
  /* Стилизация скроллбара */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`

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

const ColumnTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
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

const EditableTitle = styled.input`
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  padding: 0;
  margin: 0;
  
  &:focus {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  }
  
  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`

const ColumnTitleWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

interface EditableTitleProps {
  value: string;
  onSave: (newValue: string) => void;
}

const EditableTitleComponent: React.FC<EditableTitleProps> = ({ value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (editedValue.trim() !== value) {
      onSave(editedValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (editedValue.trim() !== value) {
        onSave(editedValue.trim());
      }
      setIsEditing(false);
    }
    if (e.key === 'Escape') {
      setEditedValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <EditableTitle
        type="text"
        value={editedValue}
        onChange={(e) => setEditedValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    );
  }

  return (
    <ColumnTitle onDoubleClick={handleDoubleClick}>
      {value}
    </ColumnTitle>
  );
};

interface ColumnsBoardProps {
    project_id: number;
}

export const ColumnsBoard: React.FC<ColumnsBoardProps> = ({ project_id }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { items: columns, loading, error } = useSelector((state: RootState) => state.columns)

  useEffect(() => {
    dispatch(fetchColumns({ 
      project_id, 
      params: { page: 1, limit: 10 } 
    }))
  }, [project_id, dispatch])

  const handleUpdateColumnName = (columnId: number, newName: string) => {
    dispatch(updateColumn({
      id: columnId,
      data: { name: newName }
    }));
  };

  if (loading) return <Loader size="medium" />
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
      
      <ColumnsContainer>
        {columns?.map(column => (
          <Column key={column?.id}>
            <ColumnHeader>
              <ColumnTitleWrapper>
                <EditableTitleComponent
                  value={column?.name || 'Без названия'}
                  onSave={(newName) => handleUpdateColumnName(Number(column?.id), newName)}
                />
              </ColumnTitleWrapper>
              <IconButton onClick={() => dispatch(deleteColumn(Number(column?.id)))} />
            </ColumnHeader>
            <AddTaskButton onClick={() => dispatch(createTask({
              name: 'Новая задача',
              column_id: Number(column?.id),
              description: 'Тестовое описание',
              deadline: null,
              status: false
            }))}>
              <PlusIcon size={16} />
              Добавить задачу
            </AddTaskButton>

            <TasksBoard column_id={Number(column?.id)} />

          </Column>
        ))}
      </ColumnsContainer>
    </div>
  )
} 