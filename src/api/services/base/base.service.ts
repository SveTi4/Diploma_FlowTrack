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
    params?: PaginationParams & SearchParams & Record<string, any>
  ): Promise<ApiListResponse<T>> {
    const response = await api.get(this.endpoint, { 
      ...this.config,
      params 
    })
    return response.data
  }

  // Получение одного элемента по ID
  protected async getById(id: string | number): Promise<ApiResponse<T>> {
    const response = await api.get(`${this.endpoint}/${id}`, this.config)
    return response.data
  }

  // Создание нового элемента
  protected async create<D = Partial<T>>(data: D): Promise<ApiResponse<T>> {
    const response = await api.post(this.endpoint, data, this.config)
    return response.data
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
    return response.data
  }

  // Удаление элемента
  protected async delete(id: string | number): Promise<ApiResponse<void>> {
    const response = await api.delete(`${this.endpoint}/${id}`, this.config)
    return response.data
  }

  // Пакетное создание
  protected async bulkCreate<D = Partial<T>>(data: D[]): Promise<ApiResponse<T[]>> {
    const response = await api.post(`${this.endpoint}/bulk`, data, this.config)
    return response.data
  }

  // Пакетное обновление
  protected async bulkUpdate<D = Partial<T>>(data: D[]): Promise<ApiResponse<T[]>> {
    const response = await api.put(`${this.endpoint}/bulk`, data, this.config)
    return response.data
  }

  // Пакетное удаление
  protected async bulkDelete(ids: (string | number)[]): Promise<ApiResponse<void>> {
    const response = await api.delete(`${this.endpoint}/bulk`, {
      ...this.config,
      data: { ids }
    })
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