import { BaseService } from '../base/base.service'
import { ApiResponse, ApiListResponse, PaginationParams } from '../../types/response.types'
import { Column, CreateColumnDto, UpdateColumnDto, ColumnFilters } from './types'

export class ColumnsService extends BaseService<Column> {
  constructor() {
    super('/columns')
  }

  // Получение списка колонок с фильтрами
  async getColumns(params?: PaginationParams & ColumnFilters): Promise<ApiListResponse<Column>> {
    return this.getList(params)
  }

  // Получение колонки по ID
  async getColumn(id: string): Promise<ApiResponse<Column>> {
    return this.getById(id)
  }

  // Создание колонки
  async createColumn(data: CreateColumnDto): Promise<ApiResponse<Column>> {
    return this.create(data)
  }

  // Обновление колонки
  async updateColumn(id: string, data: UpdateColumnDto): Promise<ApiResponse<Column>> {
    return this.update(id, data)
  }

  // Удаление колонки
  async deleteColumn(id: string): Promise<ApiResponse<void>> {
    return this.delete(id)
  }

  // Получение колонок проекта
  async getProjectColumns(projectId: string, params?: PaginationParams): Promise<ApiListResponse<Column>> {
    return this.getList({ ...params, projectId })
  }

  // Изменение порядка колонки
  async updateOrder(id: string, order: number): Promise<ApiResponse<Column>> {
    return this.patch(id, { order })
  }

  // Пакетное обновление порядка
  async bulkUpdateOrder(updates: { id: string; order: number }[]): Promise<ApiResponse<Column[]>> {
    return this.bulkUpdate(updates)
  }
} 