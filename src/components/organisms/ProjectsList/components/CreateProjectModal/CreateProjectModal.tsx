import { useState } from 'react'
import { Modal } from '../../../../molecules'
import { Button } from '../../../../atoms'
import { Form, FormGroup, Label, Input, TextArea, Actions } from "./CreateProjectModal.styles.ts";

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