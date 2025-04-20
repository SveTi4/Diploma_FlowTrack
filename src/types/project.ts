export interface Project {
  id: number
  name: string
  userId: number
}

export interface ProjectResponse {
  Id: number
  Name: string
  UserId: number
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