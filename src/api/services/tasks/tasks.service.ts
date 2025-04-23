import { BaseService } from '../base/base.service'
import { ApiResponse, PaginatedResponse, PaginationParams } from '../../types/response.types'
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  TaskFilters,
} from './types'

export class TasksService extends BaseService<Task> {
  constructor() {
    super('/tasks')
  }

  // Получение списка задач с фильтрами
  async getTasks(column_id: number, params?: PaginationParams & TaskFilters): Promise<ApiResponse<PaginatedResponse<Task>>> {
    console.log('Fetching tasks with params:', params)
    const response = await this.getList(params, `columns/${column_id}/tasks`)
    console.log('Raw Tasks API response:', response)
    return {
      data: response.data,
      status: response.status
    }
  }

  // Получение задачи по ID
  async getTask(id: number): Promise<ApiResponse<Task>> {
    console.log('Fetching task with id:', id)
    const response = await this.getById(id)
    console.log('Raw Task API response:', response)
    return {
      data: response.data,
      status: response.status
    }
  }

  // Создание задачи
  async createTask(data: CreateTaskDto): Promise<ApiResponse<Task>> {
    console.log('Creating task with data:', data)
    const response = await this.create(data)
    console.log('Raw Task API response:', response)
    return {
      data: response.data,
      status: response.status
    }
  }

  // Обновление задачи
  async updateTask(id: number, data: UpdateTaskDto): Promise<ApiResponse<Task>> {
    console.log('Updating task with id:', id, 'and data:', data)
    const response = await this.update(id, data)
    console.log('Raw Task API response:', response)
    return {
      data: response.data,
      status: response.status
    }
  }

  // Удаление задачи
  async deleteTask(id: number): Promise<ApiResponse<void>> {
    console.log('Deleting task with id:', id)
    const response = await this.delete(id)
    console.log('Raw Task API response:', response)
    return {
      data: response.data,
      status: response.status
    }
  }

  // Получение задач проекта
  // async getProjectTasks(projectId: string, params?: PaginationParams): Promise<ApiListResponse<Task>> {
  //   return this.getList({ ...params, projectId })
  // }
  //
  // // Получение задач колонки
  // async getColumnTasks(columnId: string, params?: PaginationParams): Promise<ApiListResponse<Task>> {
  //   return this.getList({ ...params, columnId })
  // }
  //
  // // Получение задач пользователя
  // async getUserTasks(assigneeId: string, params?: PaginationParams): Promise<ApiListResponse<Task>> {
  //   return this.getList({ ...params, assigneeId })
  // }

  // Перемещение задачи
  // async moveTask(id: string, data: MoveTaskDto): Promise<ApiResponse<Task>> {
  //   return this.update(id, data)
  // }

  // // Изменение статуса задачи
  // async updateStatus(id: string, status: Task['status']): Promise<ApiResponse<Task>> {
  //   return this.patch(id, { status })
  // }

  // // Изменение приоритета задачи
  // async updatePriority(id: string, priority: Task['priority']): Promise<ApiResponse<Task>> {
  //   return this.patch(id, { priority })
  // }

  // // Назначение исполнителя
  // async assignTask(id: string, assigneeId: string | null): Promise<ApiResponse<Task>> {
  //   return this.patch(id, { assigneeId })
  // }

  // // Добавление тегов
  // async addTags(id: string, tags: string[]): Promise<ApiResponse<Task>> {
  //   const task = await this.getTask(id)
  //   const updatedTags = [...new Set([...(task.data.tags || []), ...tags])]
  //   return this.patch(id, { tags: updatedTags })
  // }

  // // Удаление тегов
  // async removeTags(id: string, tags: string[]): Promise<ApiResponse<Task>> {
  //   const task = await this.getTask(id)
  //   const updatedTags = (task.data.tags || []).filter((tag: string) => !tags.includes(tag))
  //   return this.patch(id, { tags: updatedTags })
  // }
} 