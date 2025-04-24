import React from 'react'
import styled from 'styled-components'
import { TrashIcon } from '../../atoms/Icon/icons'
import { Button } from '../../atoms/Button/Button'

const TaskWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  border: 1px solid gray;
  border-radius: 16px;
  padding: 24px;
  height: auto;
  background: ${({ theme }) => theme.colors.surface};
`

const TaskHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TaskTitleWrapper = styled.div`
  flex: 1;
`

const TaskActions = styled.div`
  display: flex;
  gap: 8px;
`

const TaskContent = styled.div`
  padding: 16px;
`

const TaskDescription = styled.div`
  font-size: 14px;
`  

const TaskTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

interface TaskProps {
  id: number;
  name: string;
  description?: string;
  onDelete: (id: number) => void;
}

export const Task: React.FC<TaskProps> = ({
  id,
  name,
  description,
  onDelete
}) => {
  return (
    <TaskWrapper>
      <TaskHeader>
        <TaskTitleWrapper>
          <TaskTitle>{name}</TaskTitle>
        </TaskTitleWrapper>
        <TaskActions>
          <Button onClick={() => onDelete(id)}>
            <TrashIcon size={16} />
          </Button>
        </TaskActions>
      </TaskHeader>
      <TaskContent>
        <TaskDescription>{description}</TaskDescription>
      </TaskContent>
    </TaskWrapper>
  )
} 