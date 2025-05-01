import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../atoms/Button/Button'
import { formatDate } from '../../../utils/dateUtils'

const DateWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`

const DateValue = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid transparent;
  background: ${({ theme }) => theme.colors.surface};
  flex: 1;
`

const EditableInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  line-height: 1.5;
  flex: 1;
  height: 36px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

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
      } catch (e) {
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
      } catch (e) {
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
      } catch (e) {
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
          <Button variant="primary" size="small" onClick={handleSave}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          <Button variant="ghost" size="small" onClick={handleCancel}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </>
      ) : (
        <>
          <DateValue>{formatDate(value, 'full', placeholder)}</DateValue>
          <Button variant="ghost" size="small" onClick={handleEdit}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.3333 2.66667C11.5083 2.49167 11.7167 2.35417 11.9458 2.2625C12.175 2.17083 12.4208 2.12667 12.6667 2.13333C12.9125 2.14 13.1542 2.1975 13.3775 2.3025C13.6008 2.4075 13.8017 2.5575 13.9667 2.73333C14.1417 2.90833 14.2792 3.11667 14.3708 3.34583C14.4625 3.575 14.5067 3.82083 14.5 4.06667C14.4933 4.3125 14.4358 4.55417 14.3308 4.7775C14.2258 5.00083 14.0758 5.20167 13.9 5.36667L5.06667 14.2L2 15L2.8 11.9333L11.3333 2.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </>
      )}
    </DateWrapper>
  )
} 