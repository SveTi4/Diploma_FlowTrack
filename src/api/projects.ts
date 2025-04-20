import { api } from './axios'
import { Project, ProjectsResponse, ProjectsParams, ProjectResponse } from '../types/project'

const PROJECTS_URL = '/projects'

export const projectsApi = {
  async getProjects(params: ProjectsParams = { page: 1, limit: 10 }): Promise<ProjectsResponse> {
    const response = await api.get<ProjectResponse[]>(PROJECTS_URL, { params })
    
    // Проверяем, что получен массив
    if (!Array.isArray(response.data)) {
      throw new Error('Неверный формат данных: ожидается массив проектов')
    }

    return {
      items: response.data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        deadline: item.deadline
      })),
      total: response.data.length,
      page: params.page,
      limit: params.limit
    }
  },

  async getProject(id: number): Promise<Project> {
    const response = await api.get<ProjectResponse>(`${PROJECTS_URL}/${id}`)
    return {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description,
      deadline: response.data.deadline
    }
  },

  async createProject(data: Omit<Project, 'id' | 'userId'>): Promise<Project> {
    const response = await api.post<ProjectResponse>(PROJECTS_URL, {
      username: data.name
    })
    return {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description,
      deadline: response.data.deadline
    }
  },

  async updateProject(id: number, data: Partial<Omit<Project, 'id' | 'userId'>>): Promise<Project> {
    const response = await api.patch<ProjectResponse>(`${PROJECTS_URL}/${id}`, {
      name: data.name
    })
    return {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description,
      deadline: response.data.deadline
    }
  },

  async deleteProject(id: number): Promise<void> {
    await api.delete(`${PROJECTS_URL}/${id}`)
  }
} 