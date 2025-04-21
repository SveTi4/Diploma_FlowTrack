export interface Column {
  id: string
  title: string
  description?: string
  projectId: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface CreateColumnDto {
  title: string
  description?: string
  projectId: string
  order?: number
}

export interface UpdateColumnDto {
  title?: string
  description?: string
  order?: number
}

export interface ColumnFilters {
  projectId?: string
  search?: string
} 