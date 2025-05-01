import React, { useState, KeyboardEvent } from 'react'
import styled from 'styled-components'

const EditableInput = styled.input`
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

const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

interface EditableTitleProps {
  value: string;
  onSave: (newValue: string) => void;
}

export const EditableTitleComponent: React.FC<EditableTitleProps> = ({ value, onSave }) => {
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
      <EditableInput
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
    <Title onDoubleClick={handleDoubleClick}>
      {value}
    </Title>
  );
}; 