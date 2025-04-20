import { api } from './axios'
import { Task, TasksResponse, CreateTaskDto, UpdateTaskDto } from '../types/column'

const TASKS_URL = '/tasks'
const COLUMNS_URL = '/columns'

export const tasksApi = {
  // Получение списка задач колонки
  async getColumnTasks(columnId: number, params: { page?: number; limit?: number } = { page: 1, limit: 10 }): Promise<TasksResponse> {
    const response = await api.get<Task[]>(`${COLUMNS_URL}/${columnId}/tasks`, { 
      params: {
        page: params.page || 1,
        limit: params.limit || 10
      }
    })
    
    // Проверяем, что получен массив
    if (!Array.isArray(response.data)) {
      throw new Error('Неверный формат данных: ожидается массив задач')
    }

    return {
      items: response.data,
      total: response.data.length,
      page: params.page || 1,
      limit: params.limit || 10
    }
  },

  // Создание новой задачи
  async createTask(taskData: CreateTaskDto): Promise<Task> {
    const response = await api.post<Task>(TASKS_URL, taskData)
    return response.data
  },

  // Обновление задачи
  async updateTask(taskId: number, taskData: UpdateTaskDto): Promise<Task> {
    const response = await api.patch<Task>(`${TASKS_URL}/${taskId}`, taskData)
    return response.data
  },

  // Удаление задачи
  async deleteTask(taskId: number): Promise<void> {
    await api.delete(`${TASKS_URL}/${taskId}`)
  }
} 