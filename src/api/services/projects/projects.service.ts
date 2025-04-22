import { BaseService } from '../base/base.service'
import { ApiResponse, ApiListResponse, PaginationParams } from '../../types/response.types'
import { api } from '../../config/axios.config'
import {
  Project,
  CreateProjectDto,
  UpdateProjectDto,
  ProjectFilters,
  ProjectStats,
  ProjectPriority,
  // ProjectResponse
} from './types'

export class ProjectsService extends BaseService<Project> {
  constructor() {
    super('/projects')
  }

  // Получение списка проектов с фильтрами
  async getProjects(params?: PaginationParams & ProjectFilters): Promise<ApiListResponse<Project>> {
    console.log('Fetching projects with params:', params)
    const response = await this.getList(params)
    console.log('Raw API response:', response)
    return response
  }

  // Получение проекта по ID
  async getProject(id: number): Promise<ApiResponse<Project>> {
    const response = await this.getById(id.toString())
    return response
  }

  // Создание проекта
  async createProject(data: CreateProjectDto): Promise<ApiResponse<Project>> {
    return this.create(data)
  }

  // Обновление проекта
  async updateProject(id: string, data: UpdateProjectDto): Promise<ApiResponse<Project>> {
    return this.update(id, data)
  }

  // Удаление проекта
  async deleteProject(id: number): Promise<void> {
    await this.delete(id.toString())
  }

  // Получение статистики
  async getProjectStats(): Promise<ApiResponse<ProjectStats>> {
    const response = await api.get(`${this.endpoint}/stats`)
    return response.data
  }

  // Архивация проекта
  async archiveProject(id: string): Promise<ApiResponse<Project>> {
    return this.patch(id, { archived: true })
  }

  // Восстановление проекта из архива
  async unarchiveProject(id: string): Promise<ApiResponse<Project>> {
    return this.patch(id, { archived: false })
  }

  // Получение архивированных проектов
  async getArchivedProjects(params?: PaginationParams): Promise<ApiListResponse<Project>> {
    return this.getList({ ...params, archived: true })
  }

  // Обновление прогресса
  async updateProgress(id: string, progress: number): Promise<ApiResponse<Project>> {
    return this.patch(id, { progress })
  }

  // Обновление приоритета
  async updatePriority(id: string, priority: ProjectPriority): Promise<ApiResponse<Project>> {
    return this.patch(id, { priority })
  }

  // Добавление тегов
  async addTags(id: number, tags: string[]): Promise<ApiResponse<Project>> {
    const project = await this.getProject(id)
    const updatedTags = [...new Set([...(project.data.tags || []), ...tags])]
    return this.patch(id, { tags: updatedTags })
  }

  // Удаление тегов
  async removeTags(id: number, tags: string[]): Promise<ApiResponse<Project>> {
    const project = await this.getProject(id)
    const updatedTags = (project.data.tags || []).filter((tag: string) => !tags.includes(tag))
    return this.patch(id, { tags: updatedTags })
  }

  // Пакетное обновление статусов
  async bulkUpdateStatus(ids: string[], status: Project['status']): Promise<ApiResponse<Project[]>> {
    return this.bulkUpdate(ids.map(id => ({ id, status })))
  }

  // Пакетное обновление приоритетов
  async bulkUpdatePriority(ids: string[], priority: ProjectPriority): Promise<ApiResponse<Project[]>> {
    return this.bulkUpdate(ids.map(id => ({ id, priority })))
  }
} 