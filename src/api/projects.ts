import { api } from './axios'
import { Project, ProjectsResponse, ProjectsParams } from '../types/project'

const PROJECTS_URL = '/projects'

export const projectsApi = {
  async getProjects(params: ProjectsParams = { page: 1, limit: 10 }): Promise<ProjectsResponse> {
    const response = await api.get<ProjectsResponse>(PROJECTS_URL, { params })
    return response.data
  },

  async getProject(id: number): Promise<Project> {
    const response = await api.get<Project>(`${PROJECTS_URL}/${id}`)
    return response.data
  },

  async createProject(data: Omit<Project, 'id' | 'userId'>): Promise<Project> {
    const response = await api.post<Project>(PROJECTS_URL, data)
    return response.data
  },

  async updateProject(id: number, data: Partial<Omit<Project, 'id' | 'userId'>>): Promise<Project> {
    const response = await api.patch<Project>(`${PROJECTS_URL}/${id}`, data)
    return response.data
  },

  async deleteProject(id: number): Promise<void> {
    await api.delete(`${PROJECTS_URL}/${id}`)
  }
} 