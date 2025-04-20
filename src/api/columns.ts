import { api } from './axios'
import { Column, ColumnsResponse } from '../types/column'

const PROJECTS_URL = '/projects'
const COLUMNS_URL = '/columns'

export const columnsApi = {
  async getColumns(projectId: number, params: { page?: number; limit?: number } = { page: 1, limit: 10 }): Promise<ColumnsResponse> {
    const response = await api.get<Column[]>(`${PROJECTS_URL}/${projectId}/columns`, { 
      params: {
        page: params.page || 1,
        limit: params.limit || 10
      }
    })
    
    // Проверяем, что получен массив
    if (!Array.isArray(response.data)) {
      throw new Error('Неверный формат данных: ожидается массив колонок')
    }

    return {
      items: response.data,
      total: response.data.length,
      page: params.page || 1,
      limit: params.limit || 10
    }
  },

  async createColumn(data: { name: string; project_id: number }): Promise<Column> {
    const response = await api.post<Column>(COLUMNS_URL, data)
    return response.data
  }
} 