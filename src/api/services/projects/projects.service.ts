import { BaseService } from '../base/base.service'
import {ApiResponse, PaginationParams, PaginatedResponse} from '../../types/response.types'

import {
  Project,
  CreateProjectDto,
  UpdateProjectDto,
  ProjectFilters,
} from './types'

export class ProjectsService extends BaseService<Project> {
  constructor() {
    super('/projects')
  }

  // Получение списка проектов с фильтрами
  async getProjects(params?: PaginationParams & ProjectFilters): Promise<ApiResponse<PaginatedResponse<Project>>> {
    console.log('Fetching projects with params:', params)
    const response = await this.getList(params)
    console.log('Raw API response:', response)
    return response
  }

  // Получение проекта по ID
  async getProject(id: number): Promise<ApiResponse<Project>> {
    console.log('Fetching project with id:', id)
    const response = await this.getById(id.toString())
    console.log('Raw Project API response:', response)
    return response
  }

  // Создание проекта
  async createProject(data: CreateProjectDto): Promise<ApiResponse<Project>> {
    return this.create(data)
  }

  // Обновление проекта
  async updateProject(id: string, data: UpdateProjectDto): Promise<ApiResponse<Project>> {
    const response = await this.patch(id, data)
    return {
      data: response.data,
      status: response.status
    }
  }

  // Удаление проекта
  async deleteProject(id: number): Promise<void> {
    await this.delete(id.toString())
  }
}