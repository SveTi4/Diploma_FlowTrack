import React from 'react'
import styled from 'styled-components'
import { SidePanel } from '../../../SidePanel/SidePanel'
import { EditableTitleComponent } from '../../../ColumnsBoard/components/EditableTitle/EditableTitle'
import {Task} from "../../../../../api/services";

const Section = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.large};
`

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`

const Description = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`

const SubtasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`

interface TaskPanelProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  onUpdateTask?: (id: number, data: { name?: string; description?: string }) => void;
}

export const TaskPanel: React.FC<TaskPanelProps> = ({
  isOpen,
  onClose,
  task,
  onUpdateTask
}) => {
  if (!task) return null;

  const handleNameUpdate = (newName: string) => {
    onUpdateTask?.(task.id, { name: newName });
  };

  const handleDescriptionUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateTask?.(task.id, { description: e.target.value });
  };

  return (
    <SidePanel
      isOpen={isOpen}
      title={
        <EditableTitleComponent
          value={task.name}
          onSave={handleNameUpdate}
        />
      }
      onClose={onClose}
    >
      <Section>
        <SectionTitle>Описание</SectionTitle>
        <Description
          value={task.description || ''}
          onChange={handleDescriptionUpdate}
          placeholder="Добавьте описание задачи..."
        />
      </Section>

      <Section>
        <SectionTitle>Подзадачи</SectionTitle>
        <SubtasksList>
          {/* Здесь будет список подзадач */}
        </SubtasksList>
      </Section>
    </SidePanel>
  );
}; 