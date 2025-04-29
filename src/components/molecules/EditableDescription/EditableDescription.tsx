import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../atoms/Button/Button'

const DescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Description = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid transparent;
  background: ${({ theme }) => theme.colors.surface};
  flex: 1;
  min-height: 36px;
`

const EditableTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`

const IconButton = styled(Button)`
  && {
    padding: 0 !important;
    min-width: 36px !important;
    width: 36px !important;
    height: 36px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: ${({ theme }) => theme.borderRadius.small} !important;
    box-sizing: border-box !important;
  }
`

interface EditableDescriptionProps {
  value: string
  onSave: (newValue: string) => void
  placeholder?: string
  className?: string
}

export const EditableDescription: React.FC<EditableDescriptionProps> = ({
  value,
  onSave,
  placeholder = 'Добавьте описание...',
  className
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)

  // Инициализируем editedValue при изменении value
  React.useEffect(() => {
    setEditedValue(value)
  }, [value])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editedValue !== value) {
      onSave(editedValue)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedValue(value)
    setIsEditing(false)
  }

  return (
    <DescriptionWrapper className={className}>
      {isEditing ? (
        <>
          <EditableTextarea
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            placeholder={placeholder}
            autoFocus
          />
          <ButtonsWrapper>
            <IconButton variant="primary" size="small" onClick={handleSave}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </IconButton>
            <IconButton variant="ghost" size="small" onClick={handleCancel}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </IconButton>
          </ButtonsWrapper>
        </>
      ) : (
        <>
          <Description>{value || placeholder}</Description>
          <ButtonsWrapper>
            <IconButton variant="ghost" size="small" onClick={handleEdit}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3333 2.66667C11.5083 2.49167 11.7167 2.35417 11.9458 2.2625C12.175 2.17083 12.4208 2.12667 12.6667 2.13333C12.9125 2.14 13.1542 2.1975 13.3775 2.3025C13.6008 2.4075 13.8017 2.5575 13.9667 2.73333C14.1417 2.90833 14.2792 3.11667 14.3708 3.34583C14.4625 3.575 14.5067 3.82083 14.5 4.06667C14.4933 4.3125 14.4358 4.55417 14.3308 4.7775C14.2258 5.00083 14.0758 5.20167 13.9 5.36667L5.06667 14.2L2 15L2.8 11.9333L11.3333 2.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </IconButton>
          </ButtonsWrapper>
        </>
      )}
    </DescriptionWrapper>
  )
} 