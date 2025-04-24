import React, { useState } from 'react'
import styled from 'styled-components'
import { DeleteButton } from '../../../../atoms/DeleteButton/DeleteButton'
import { TaskPanel } from '../TaskPanel/TaskPanel'

const TaskWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    &::before {
      opacity: 0.1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const TaskHeader = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.surface};
`

const TaskTitleWrapper = styled.div`
  flex: 1;
`

const TaskActions = styled.div`
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${TaskWrapper}:hover & {
    opacity: 1;
  }
`

const TaskContent = styled.div`
  padding: 0 16px 16px;
  background: ${({ theme }) => theme.colors.surface};
`

const TaskDescription = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 60px;
    height: 100%;
    background: linear-gradient(to right, transparent, ${({ theme }) => theme.colors.surface});
  }
`

const TaskTitle = styled.h3`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.4;
`

interface TaskProps {
  id: number;
  name: string;
  description?: string;
  onDelete: (id: number) => void;
  onUpdate?: (id: number, data: { name?: string; description?: string }) => void;
}

export const Task: React.FC<TaskProps> = ({
  id,
  name,
  description,
  onDelete,
  onUpdate
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleClick = () => {
    setIsPanelOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <>
      <TaskWrapper onClick={handleClick}>
        <TaskHeader>
          <TaskTitleWrapper>
            <TaskTitle>{name}</TaskTitle>
          </TaskTitleWrapper>
          <TaskActions>
            <DeleteButton onClick={handleDeleteClick} />
          </TaskActions>
        </TaskHeader>
        {description && (
          <TaskContent>
            <TaskDescription>{description}</TaskDescription>
          </TaskContent>
        )}
      </TaskWrapper>

      <TaskPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        task={{ id, name, description }}
        onUpdateTask={onUpdate}
      />
    </>
  )
} 