import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Column, CreateTaskDto, UpdateTaskDto, Task } from '../../../types/column'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { fetchColumnTasks, deleteTask } from '../../../store/tasks/tasksSlice'
import { Modal } from '../../atoms/Modal/Modal'
import { tasksApi } from '../../../api/tasks'

const ColumnContainer = styled.div`
  background: #27282A;
  border: #323336 1px solid;
  border-radius: 12px;
  padding: 20px;
  min-width: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ColumnHeader = styled.div`
  color: ${({ theme }) => theme.colors.light};
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TaskCount = styled.span`
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.5;
  font-size: 14px;
`

const TaskList = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`

const TaskCard = styled.div<{ completed?: boolean }>`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  opacity: ${({ completed }) => completed ? 0.6 : 1};
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const TaskTitle = styled.div`
  color: ${({ theme }) => theme.colors.light};
  font-size: 14px;
  margin-bottom: 8px;
`

const TaskDescription = styled.div`
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.7;
  font-size: 12px;
  margin-bottom: 8px;
`

const TaskMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.5;
  font-size: 11px;
`

const LoadingText = styled.div`
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.7;
  text-align: center;
  padding: 20px;
`

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  text-align: center;
  padding: 20px;
  font-size: 12px;
`

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.danger};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }
`

const AddButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 16px 0;
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    stroke-width: 2.5;
  }
`

const TaskForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const FormLabel = styled.label`
  color: ${({ theme }) => theme.colors.light};
  font-size: 14px;
`

const FormInput = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 8px 12px;
  color: ${({ theme }) => theme.colors.light};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const FormTextarea = styled.textarea`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 8px 12px;
  color: ${({ theme }) => theme.colors.light};
  font-size: 14px;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`

const CancelButton = styled.button`
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.light};
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
  margin-top: 4px;
`

const EditButton = styled.button`
  position: absolute;
  top: 8px;
  right: 40px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }
`

interface TaskColumnProps {
  column: Column
}

export const TaskColumn = ({ column }: TaskColumnProps) => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.tasks.items[column.id] || [])
  const loading = useAppSelector((state) => state.tasks.loading[column.id])
  const error = useAppSelector((state) => state.tasks.error[column.id])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadline: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    deadline: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    deadline: ''
  })

  useEffect(() => {
    dispatch(fetchColumnTasks({ columnId: column.id }))
  }, [dispatch, column.id])

  const handleDeleteTask = (taskId: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      dispatch(deleteTask({ taskId, columnId: column.id }))
    }
  }

  const formatDateForApi = (dateString: string) => {
    const date = new Date(dateString)
    date.setHours(9, 0, 0, 0) // Устанавливаем время на 09:00
    return date.toISOString() // Получаем формат "2023-11-10T09:00:00.000Z"
  }

  const validateForm = (data: typeof formData) => {
    const newErrors = {
      name: '',
      deadline: ''
    }
    let isValid = true

    if (!data.name.trim()) {
      newErrors.name = 'Название задачи обязательно'
      isValid = false
    }

    if (!data.deadline) {
      newErrors.deadline = 'Дата дедлайна обязательна'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm(formData)) {
      return
    }

    setIsSubmitting(true)
    try {
      const taskData: CreateTaskDto = {
        column_id: column.id,
        name: formData.name,
        description: formData.description,
        status: true,
        deadline: formatDateForApi(formData.deadline)
      }

      await tasksApi.createTask(taskData)
      dispatch(fetchColumnTasks({ columnId: column.id }))
      setIsModalOpen(false)
      setFormData({ name: '', description: '', deadline: '' })
      setErrors({ name: '', deadline: '' })
    } catch (error) {
      console.error('Ошибка при создании задачи:', error)
      // TODO: Добавить уведомление об ошибке
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditClick = (task: Task) => {
    setEditingTask(task)
    setEditFormData({
      name: task.name,
      description: task.description || '',
      deadline: task.deadline.split('T')[0]
    })
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm(editFormData)) {
      return
    }

    if (!editingTask) return

    setIsSubmitting(true)
    try {
      const taskData: UpdateTaskDto = {
        name: editFormData.name,
        description: editFormData.description,
        deadline: formatDateForApi(editFormData.deadline)
      }

      await tasksApi.updateTask(editingTask.id, taskData)
      dispatch(fetchColumnTasks({ columnId: column.id }))
      setEditingTask(null)
      setEditFormData({ name: '', description: '', deadline: '' })
      setErrors({ name: '', deadline: '' })
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <ColumnContainer>
      <ColumnHeader>
        {column.name}
        <TaskCount>{tasks.length}</TaskCount>
      </ColumnHeader>
      <AddButton onClick={() => setIsModalOpen(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Добавить
      </AddButton>
      <TaskList>
        {loading ? (
          <LoadingText>Загрузка задач...</LoadingText>
        ) : error ? (
          <ErrorText>{error}</ErrorText>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} completed={task.status}>
              <EditButton onClick={() => handleEditClick(task)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </EditButton>
              <DeleteButton onClick={() => handleDeleteTask(task.id)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M3 7H21M17 7V4C17 3.44772 16.5523 3 16 3H8C7.44772 3 7 3.44772 7 4V7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </DeleteButton>
              <TaskTitle>{task.name}</TaskTitle>
              {task.description && (
                <TaskDescription>{task.description}</TaskDescription>
              )}
              <TaskMeta>
                <span>Срок: {formatDate(task.deadline)}</span>
                <span>{task.status ? 'Завершено' : 'В работе'}</span>
              </TaskMeta>
            </TaskCard>
          ))
        )}
      </TaskList>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          if (!isSubmitting) {
            setIsModalOpen(false)
            setErrors({ name: '', deadline: '' })
          }
        }}
        title="Создать задачу"
      >
        <TaskForm onSubmit={handleSubmit}>
          <FormField>
            <FormLabel>Название *</FormLabel>
            <FormInput
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                if (errors.name) {
                  setErrors({ ...errors, name: '' })
                }
              }}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormField>
          <FormField>
            <FormLabel>Описание</FormLabel>
            <FormTextarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </FormField>
          <FormField>
            <FormLabel>Дата дедлайна *</FormLabel>
            <FormInput
              type="date"
              value={formData.deadline}
              onChange={(e) => {
                setFormData({ ...formData, deadline: e.target.value })
                if (errors.deadline) {
                  setErrors({ ...errors, deadline: '' })
                }
              }}
            />
            {errors.deadline && <ErrorMessage>{errors.deadline}</ErrorMessage>}
          </FormField>
          <FormActions>
            <CancelButton 
              type="button" 
              onClick={() => {
                if (!isSubmitting) {
                  setIsModalOpen(false)
                  setErrors({ name: '', deadline: '' })
                }
              }}
              disabled={isSubmitting}
            >
              Отмена
            </CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Создание...' : 'Создать'}
            </SubmitButton>
          </FormActions>
        </TaskForm>
      </Modal>

      <Modal
        isOpen={!!editingTask}
        onClose={() => {
          if (!isSubmitting) {
            setEditingTask(null)
            setErrors({ name: '', deadline: '' })
          }
        }}
        title="Редактировать задачу"
      >
        <TaskForm onSubmit={handleEditSubmit}>
          <FormField>
            <FormLabel>Название *</FormLabel>
            <FormInput
              type="text"
              value={editFormData.name}
              onChange={(e) => {
                setEditFormData({ ...editFormData, name: e.target.value })
                if (errors.name) {
                  setErrors({ ...errors, name: '' })
                }
              }}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormField>
          <FormField>
            <FormLabel>Описание</FormLabel>
            <FormTextarea
              value={editFormData.description}
              onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
            />
          </FormField>
          <FormField>
            <FormLabel>Дата дедлайна *</FormLabel>
            <FormInput
              type="date"
              value={editFormData.deadline}
              onChange={(e) => {
                setEditFormData({ ...editFormData, deadline: e.target.value })
                if (errors.deadline) {
                  setErrors({ ...errors, deadline: '' })
                }
              }}
            />
            {errors.deadline && <ErrorMessage>{errors.deadline}</ErrorMessage>}
          </FormField>
          <FormActions>
            <CancelButton 
              type="button" 
              onClick={() => {
                if (!isSubmitting) {
                  setEditingTask(null)
                  setErrors({ name: '', deadline: '' })
                }
              }}
              disabled={isSubmitting}
            >
              Отмена
            </CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Сохранение...' : 'Сохранить'}
            </SubmitButton>
          </FormActions>
        </TaskForm>
      </Modal>
    </ColumnContainer>
  )
} 