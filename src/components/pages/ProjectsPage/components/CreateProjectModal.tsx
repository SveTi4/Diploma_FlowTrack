import { useState } from 'react'
import styled from 'styled-components'
import { Modal } from '../../../atoms/Modal/Modal'
import { Button } from '../../../atoms/Button/Button'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`

const Input = styled.input`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 12px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

const TextArea = styled.textarea`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 12px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
`

interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (project: { name: string; description: string; deadline: string | null }) => void
}

export const CreateProjectModal = ({ isOpen, onClose, onSubmit }: CreateProjectModalProps) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      description,
      deadline: deadline ? new Date(deadline).toISOString() : null
    })
    setName('')
    setDescription('')
    setDeadline('')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Создание проекта"
    >
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Название проекта</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название проекта"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Описание</Label>
          <TextArea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Опишите цели и задачи проекта"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="deadline">Дедлайн</Label>
          <Input
            id="deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </FormGroup>

        <Actions>
          <Button variant="ghost" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit">
            Создать проект
          </Button>
        </Actions>
      </Form>
    </Modal>
  )
}