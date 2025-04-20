import { api } from './axios'
import { Task, TasksResponse } from '../types/column'

const COLUMNS_URL = '/columns'

export const tasksApi = {
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
  }
} 