export interface Project {
  id: number
  name: string
  description: string
  deadline: string | null
}

export interface ProjectResponse {
  id: number
  name: string
  description: string
  deadline: string | null
}

export interface ProjectsResponse {
  items: Project[]
  total?: number
  page?: number
  limit?: number
}

export interface ProjectsParams {
  page?: number
  limit?: number
} 