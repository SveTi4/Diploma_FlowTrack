export interface Column {
  id: string
  name: string
  project_id: number
  position: number
  order?: number

  // createdAt: string
  // updatedAt: string
}

export interface CreateColumnDto {
  name: string
  project_id: number
  order?: number
}

export interface UpdateColumnDto {
  name?: string
  order?: number
  position?: number
}

export interface ColumnFilters {
  search?: string
} 