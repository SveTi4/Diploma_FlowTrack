import { AxiosRequestConfig } from 'axios'
import { api } from '../../config/axios.config'
import { 
  ApiResponse, 
  ApiListResponse,
  PaginationParams,
  SearchParams 
} from '../../types/response.types'

export abstract class BaseService<T> {
  protected constructor(
    protected readonly endpoint: string,
    protected readonly config?: AxiosRequestConfig
  ) {}

  // Получение списка с пагинацией и поиском
  protected async getList(
      params?: PaginationParams & SearchParams & Record<string, any>,
      altEndpoint?: string
  ): Promise<ApiListResponse<T>> {
    const endpoint = altEndpoint ?? this.endpoint;

    const response = await api.get(endpoint, {
      ...this.config,
      params 
    })
    console.log("base Response: ", response)

    // Извлекаем важные заголовки
    const totalCount = parseInt(response.headers['x-total-count'] || '0')
    const page = params?.page || 1
    const limit = params?.limit || 10

    return {
      data: {
        items: response.data,
        total: totalCount,
        page: page,
        limit: limit,
        totalPages: Math.ceil(totalCount / limit)
      },
      status: response.status,
    }
  }

  // Получение одного элемента по ID
  protected async getById(id: string | number): Promise<ApiResponse<T>> {
    const response = await api.get(`${this.endpoint}/${id}`, this.config)
    return {
      data: response.data,
      status: response.status,
    }
  }

  // Создание нового элемента
  protected async create<D = Partial<T>>(data: D): Promise<ApiResponse<T>> {
    const response = await api.post(this.endpoint, data, this.config)
    return {
      data: response.data,
      status: response.status
    }
  }

  // Обновление элемента
  protected async update<D = Partial<T>>(
    id: string | number, 
    data: D
  ): Promise<ApiResponse<T>> {
    const response = await api.put(`${this.endpoint}/${id}`, data, this.config)
    return response.data
  }

  // Частичное обновление элемента
  protected async patch<D = Partial<T>>(
    id: string | number, 
    data: D
  ): Promise<ApiResponse<T>> {
    const response = await api.patch(`${this.endpoint}/${id}`, data, this.config)
    return {
      data: response.data,
      status: response.status
    }
  }

  // Удаление элемента
  protected async delete(id: string | number): Promise<ApiResponse<void>> {
    const response = await api.delete(`${this.endpoint}/${id}`, this.config)
    return response.data
  }

  // Проверка существования
  protected async exists(id: string | number): Promise<boolean> {
    try {
      await this.getById(id)
      return true
    } catch {
      return false
    }
  }
} 