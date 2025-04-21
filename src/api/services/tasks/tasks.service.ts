import { BaseService } from '../base/base.service'
import { ApiResponse, ApiListResponse, PaginationParams } from '../../types/response.types'
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  TaskFilters,
  MoveTaskDto
} from './types'

export class TasksService extends BaseService<Task> {
  constructor() {
    super('/tasks')
  }

  // Получение списка задач с фильтрами
  async getTasks(params?: PaginationParams & TaskFilters): Promise<ApiListResponse<Task>> {
    return this.getList(params)
  }

  // Получение задачи по ID
  async getTask(id: string): Promise<ApiResponse<Task>> {
    return this.getById(id)
  }

  // Создание задачи
  async createTask(data: CreateTaskDto): Promise<ApiResponse<Task>> {
    return this.create(data)
  }

  // Обновление задачи
  async updateTask(id: string, data: UpdateTaskDto): Promise<ApiResponse<Task>> {
    return this.update(id, data)
  }

  // Удаление задачи
  async deleteTask(id: string): Promise<ApiResponse<void>> {
    return this.delete(id)
  }

  // Получение задач проекта
  async getProjectTasks(projectId: string, params?: PaginationParams): Promise<ApiListResponse<Task>> {
    return this.getList({ ...params, projectId })
  }

  // Получение задач колонки
  async getColumnTasks(columnId: string, params?: PaginationParams): Promise<ApiListResponse<Task>> {
    return this.getList({ ...params, columnId })
  }

  // Получение задач пользователя
  async getUserTasks(assigneeId: string, params?: PaginationParams): Promise<ApiListResponse<Task>> {
    return this.getList({ ...params, assigneeId })
  }

  // Перемещение задачи
  async moveTask(id: string, data: MoveTaskDto): Promise<ApiResponse<Task>> {
    return this.update(id, data)
  }

  // Изменение статуса задачи
  async updateStatus(id: string, status: Task['status']): Promise<ApiResponse<Task>> {
    return this.patch(id, { status })
  }

  // Изменение приоритета задачи
  async updatePriority(id: string, priority: Task['priority']): Promise<ApiResponse<Task>> {
    return this.patch(id, { priority })
  }

  // Назначение исполнителя
  async assignTask(id: string, assigneeId: string | null): Promise<ApiResponse<Task>> {
    return this.patch(id, { assigneeId })
  }

  // Добавление тегов
  async addTags(id: string, tags: string[]): Promise<ApiResponse<Task>> {
    const task = await this.getTask(id)
    const updatedTags = [...new Set([...(task.data.tags || []), ...tags])]
    return this.patch(id, { tags: updatedTags })
  }

  // Удаление тегов
  async removeTags(id: string, tags: string[]): Promise<ApiResponse<Task>> {
    const task = await this.getTask(id)
    const updatedTags = (task.data.tags || []).filter((tag: string) => !tags.includes(tag))
    return this.patch(id, { tags: updatedTags })
  }

  // Пакетное обновление статусов
  async bulkUpdateStatus(ids: string[], status: Task['status']): Promise<ApiResponse<Task[]>> {
    return this.bulkUpdate(ids.map(id => ({ id, status })))
  }

  // Пакетное обновление приоритетов
  async bulkUpdatePriority(ids: string[], priority: Task['priority']): Promise<ApiResponse<Task[]>> {
    return this.bulkUpdate(ids.map(id => ({ id, priority })))
  }

  // Пакетное назначение исполнителя
  async bulkAssign(ids: string[], assigneeId: string): Promise<ApiResponse<Task[]>> {
    return this.bulkUpdate(ids.map(id => ({ id, assigneeId })))
  }
} 