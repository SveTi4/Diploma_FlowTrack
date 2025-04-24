import React, { useState} from 'react'
import styled from 'styled-components'
import { DeleteButton } from '../../../../atoms/DeleteButton/DeleteButton'
import { TaskPanel } from '../TaskPanel/TaskPanel'
import { CheckIcon } from "../../../../atoms/Icon/icons.tsx";

const TaskWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
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

const TaskStatus = styled.div`
  width: 16%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: inherit;
  background: inherit;
  border-right: inherit;
  transition: 
          color 0.2s ease-in-out, 
          background 0.2s ease-in-out,
          width 0.2s ease-in-out,
          height 0.2s ease-in-out;
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`

const TaskInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  status?: boolean;
  onDelete: (id: number) => void;
  onUpdate?: (id: number, data: { name?: string; description?: string, status?: boolean }) => void;
}

export const Task: React.FC<TaskProps> = ({
  id,
  name,
  description,
  status,
  onDelete,
  onUpdate
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [stateIconBefore, setStateIconBefore] = useState({color: status ? 'green' : 'red', size: 24});
  const [stateIconAfter, setStateIconAfter] = useState({color: 'gray', size: 0});
  const handleClick = () => {
    setIsPanelOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  const handleUpdateStatus = () => {
    console.log("Текущий статус: ", status);
    console.log("Ожидаемый статус: ", !status);
    onUpdate?.(id, { status: !status });
  }

  const handleStatusHover = () => {
    setStateIconBefore({color: 'gray', size: 0});
    setStateIconAfter({color: !status ? 'green' : 'red', size: 24});
  }

  const handleStatusUnHover = () => {
    setStateIconBefore({color: status ? 'green' : 'red', size: 24});
    setStateIconAfter({color: 'gray', size: 0});
  }

  return (
    <>
      <TaskWrapper>
        <TaskStatus
          onClick={handleUpdateStatus}
          onMouseEnter={handleStatusHover}
          onMouseLeave={handleStatusUnHover}
        >
          <CheckIcon size={stateIconBefore.size} color={stateIconBefore.color} />
          <CheckIcon size={stateIconAfter.size} color={stateIconAfter.color} />
        </TaskStatus>

        <TaskInfo onClick={handleClick}>
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
        </TaskInfo>
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