import React, { useState } from 'react'
import { IconButton } from '../../atoms'
import { TitleWrapper, Title, EditableInput } from './EditableTitle.styles'

interface EditableTitleProps {
  value: string
  onSave: (newValue: string) => void
  placeholder?: string
  className?: string
}

export const EditableTitle: React.FC<EditableTitleProps> = ({
  value,
  onSave,
  placeholder = 'Введите название',
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
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <TitleWrapper className={className}>
      {isEditing ? (
        <>
          <EditableInput
            type="text"
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
          <IconButton onClick={handleEdit} type="edit" />
          <Title>{value || placeholder}</Title>
        </>
      )}
    </TitleWrapper>
  )
} 