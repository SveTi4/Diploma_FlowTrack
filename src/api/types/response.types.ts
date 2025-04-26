export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  status: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiListResponse<T> extends ApiResponse<PaginatedResponse<T>> {}

// Общие параметры для запросов с пагинацией
export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Общие параметры для поиска
export interface SearchParams {
  search?: string;
  startDate?: string;
  endDate?: string;
  tags?: string[];
} 