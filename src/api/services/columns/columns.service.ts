import { BaseService } from '../base/base.service'
import {Column, ColumnFilters, CreateColumnDto} from './types'
import {ApiResponse, PaginatedResponse, PaginationParams} from "../../types/response.types.ts";

export class ColumnsService extends BaseService<Column> {
  constructor() {
    super('/columns')
  }

  // Получение списка колонок с фильтрами
  async getColumns(projectId: number, params?: PaginationParams & ColumnFilters): Promise<ApiResponse<PaginatedResponse<Column>>> {
    console.log('Fetching columns with params:', params)
    const response = await this.getList(params, `projects/${projectId}/columns`)
    console.log('Raw API response:', response)
    return response
  }

  async createColumn(data: CreateColumnDto): Promise<ApiResponse<Column>> {
    return this.create(data)
  }

  async deleteColumn(id: number): Promise<void> {
    await this.delete(id.toString())
  }
  //
  // Получение колонки по ID
  // async getColumn(id: string): Promise<ApiResponse<Column>> {
  //   return this.getById(id)
  // }
  //
  // // Создание колонки
  // async createColumn(data: CreateColumnDto): Promise<ApiResponse<Column>> {
  //   return this.create(data)
  // }
  //
  // // Обновление колонки
  // async updateColumn(id: string, data: UpdateColumnDto): Promise<ApiResponse<Column>> {
  //   return this.update(id, data)
  // }
  //
  // // Удаление колонки
  // async deleteColumn(id: string): Promise<ApiResponse<void>> {
  //   return this.delete(id)
  // }
  //
  // // Получение колонок проекта
  // async getProjectColumns(projectId: string, params?: PaginationParams): Promise<ApiListResponse<Column>> {
  //   return this.getList({ ...params, projectId })
  // }
  //
  // // Изменение порядка колонки
  // async updateOrder(id: string, order: number): Promise<ApiResponse<Column>> {
  //   return this.patch(id, { order })
  // }
  //
  // // Пакетное обновление порядка
  // async bulkUpdateOrder(updates: { id: string; order: number }[]): Promise<ApiResponse<Column[]>> {
  //   return this.bulkUpdate(updates)
  // }
} 