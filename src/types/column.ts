export interface Column {
  Id: number
  ProjectId: number
  Name: string
}

export interface Task {
  Id: number
  ColumnId: number
  Name: string
  Description: string
  Status: boolean
  Deadline: string
  CreatedAt: string
  UpdatedAt: string
}

export interface Subtask {
  id: number
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface TasksResponse {
  items: Task[]
  total?: number
  page?: number
  limit?: number
}

export interface ColumnsResponse {
  items: Column[]
  total?: number
  page?: number
  limit?: number
} 