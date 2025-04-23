import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { PlusIcon, TrashIcon } from '../../atoms/Icon/icons'
import { createColumn, deleteColumn, fetchColumns } from '../../../store/columns/columnsSlice'
import { AppDispatch } from '../../../store'
import {Loader} from "../../atoms/Loader/Loader.tsx";

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

const AddColumnButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  
  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }
`

const ColumnsContainer = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px 0;
  overflow-x: auto;
  width: 100%;
  white-space: nowrap;
`

const Column = styled.div`
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
    padding: 0;
    width: 100%;
    height: 48px;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    
    &:hover {
        background: #888888;
    }
`

const ColumnContent = styled.div`
  padding: 16px;
  min-height: 100px;
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

interface ColumnsBoardProps {
  projectId: number;
}

export const ColumnsBoard: React.FC<ColumnsBoardProps> = ({ projectId }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { items: columns, loading, error } = useSelector((state: RootState) => state.columns)

  useEffect(() => {
    dispatch(fetchColumns({ 
      projectId, 
      params: { page: 1, limit: 10 } 
    }))
  }, [projectId, dispatch])

  if (loading) return <Loader size="medium" />
  if (error) return <div>Ошибка: {error}</div>

  return (
    <div>
      <BoardHeader>
        <BoardTitle>Колонки</BoardTitle>
        <AddColumnButton
            onClick={() => dispatch(createColumn({
                name: 'New Column',
                project_id: projectId
            }))}
        >
          <PlusIcon size={16} />
          Добавить колонку
        </AddColumnButton>
      </BoardHeader>
      
      <ColumnsContainer>
        {columns.map(column => (
          <Column key={column.id}>
            <ColumnHeader>
              <ColumnTitle>{column.name}</ColumnTitle>
              <DeleteColumnButton
                onClick={() => dispatch(deleteColumn(parseInt(column.id)))}
              >
                <TrashIcon size={16} />
              </DeleteColumnButton>
            </ColumnHeader>
            <AddTaskButton>
              <PlusIcon size={24} />
              Add tsk
            </AddTaskButton>
            <ColumnContent>
              {/* Здесь будут задачи колонки */}
            </ColumnContent>
          </Column>
        ))}
      </ColumnsContainer>
    </div>
  )
} 