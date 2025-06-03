import React, { useState } from 'react'
import { IconButton } from '../../atoms'
import { formatDate } from '../../../utils/dateUtils'
import { DateWrapper, DateValue, EditableInput } from './EditableDate.styles'

interface EditableDateProps {
  value: string | null
  onSave: (newValue: string | null) => void
  placeholder?: string
  className?: string
}

export const EditableDate: React.FC<EditableDateProps> = ({
  value,
  onSave,
  placeholder = 'Без дедлайна',
  className
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState<string>('')

  // Инициализируем editedValue при изменении value
  React.useEffect(() => {
    if (value) {
      try {
        const timestamp = window.Date.parse(value)
        if (!isNaN(timestamp)) {
          const date = new window.Date(timestamp)
          // Получаем локальное время в формате YYYY-MM-DDThh:mm
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const day = String(date.getDate()).padStart(2, '0')
          const hours = String(date.getHours()).padStart(2, '0')
          const minutes = String(date.getMinutes()).padStart(2, '0')
          setEditedValue(`${year}-${month}-${day}T${hours}:${minutes}`)
        } else {
          setEditedValue('')
        }
      } catch {
        setEditedValue('')
      }
    } else {
      setEditedValue('')
    }
  }, [value])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editedValue) {
      try {
        const timestamp = window.Date.parse(editedValue)
        if (!isNaN(timestamp)) {
          const date = new window.Date(timestamp)
          onSave(date.toISOString())
        } else {
          onSave(null)
        }
      } catch {
        onSave(null)
      }
    } else {
      onSave(null)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    if (value) {
      try {
        const timestamp = window.Date.parse(value)
        if (!isNaN(timestamp)) {
          const date = new window.Date(timestamp)
          // Получаем локальное время в формате YYYY-MM-DDThh:mm
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const day = String(date.getDate()).padStart(2, '0')
          const hours = String(date.getHours()).padStart(2, '0')
          const minutes = String(date.getMinutes()).padStart(2, '0')
          setEditedValue(`${year}-${month}-${day}T${hours}:${minutes}`)
        } else {
          setEditedValue('')
        }
      } catch {
        setEditedValue('')
      }
    } else {
      setEditedValue('')
    }
    setIsEditing(false)
  }

  return (
    <DateWrapper className={className}>
      {isEditing ? (
        <>
          <EditableInput
            type="datetime-local"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            autoFocus
            placeholder="ДД/ММ/ГГГГ ЧЧ:ММ"
            title="Формат: ДД/ММ/ГГГГ ЧЧ:ММ"
          />
          <IconButton onClick={handleSave} type="save" />
          <IconButton onClick={handleCancel} type="cancel" />
        </>
      ) : (
        <>
          <DateValue>{formatDate(value, 'full', placeholder)}</DateValue>
          <IconButton onClick={handleEdit} type="edit" />
        </>
      )}
    </DateWrapper>
  )
} 