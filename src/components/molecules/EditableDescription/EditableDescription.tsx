import React, { useState } from 'react'
import { IconButton } from '../../atoms/IconButton/IconButton'
import { DescriptionWrapper, Description, EditableTextarea } from './EditableDescription.styles'

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <DescriptionWrapper className={className}>
      {isEditing ? (
        <>
          <EditableTextarea
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus
          />
          <IconButton onClick={handleSave} type="save" />
          <IconButton onClick={handleCancel} type="cancel" />
        </>
      ) : (
        <>
          <Description>{value || placeholder}</Description>
          <IconButton onClick={handleEdit} type="edit" />
        </>
      )}
    </DescriptionWrapper>
  )
} 