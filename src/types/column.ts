export interface Column {
  id: number
  project_id: number
  name: string
}

export interface Task {
  id: number
  column_id: number
  name: string
  description: string
  status: boolean
  deadline: string
  created_at: string
  updated_at: string
}

export interface Subtask {
  id: number
  title: string
  completed: boolean
  created_at: string
  updated_at: string
}

export interface CreateTaskDto {
  column_id: number
  name: string
  description: string
  status: boolean
  deadline: string
}

export interface UpdateTaskDto {
  column_id?: number
  name?: string
  description?: string
  status?: boolean
  deadline?: string
}

export interface TasksResponse {
  items: Task[]
  total: number
  page: number
  limit: number
}

export interface ColumnsResponse {
  items: Column[]
  total?: number
  page?: number
  limit?: number
} 