import { BaseService } from '../base/base.service'
import { ApiResponse } from '../../types/response.types'
import { api } from '../../config/axios.config'
import {
  User,
  LoginDto,
  RegisterDto,
  AuthResponse,
  ResetPasswordDto,
  UpdatePasswordDto,
  UpdateProfileDto
} from './types'

export class AuthService extends BaseService<User> {
  constructor() {
    super('/auth')
  }

  // Авторизация
  async login(data: LoginDto): Promise<ApiResponse<AuthResponse>> {
    const response = await api.post(`${this.endpoint}/login`, data)
    return response.data
  }

  // Регистрация
  async register(data: RegisterDto): Promise<ApiResponse<AuthResponse>> {
    const response = await api.post(`${this.endpoint}/register`, data)
    return response.data
  }

  // Выход из системы
  async logout(): Promise<ApiResponse<void>> {
    const response = await api.post(`${this.endpoint}/logout`)
    return response.data
  }

  // Обновление токена
  async refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
    const response = await api.get(`${this.endpoint}/refresh`)
    return response.data
  }

  // Получение текущего пользователя
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await api.get(`${this.endpoint}/me`)
    return response.data
  }

  // Сброс пароля (отправка письма)
  async resetPassword(data: ResetPasswordDto): Promise<ApiResponse<void>> {
    const response = await api.post(`${this.endpoint}/reset-password`, data)
    return response.data
  }

  // Обновление пароля
  async updatePassword(data: UpdatePasswordDto): Promise<ApiResponse<void>> {
    const response = await api.post(`${this.endpoint}/update-password`, data)
    return response.data
  }

  // Обновление профиля
  async updateProfile(data: UpdateProfileDto): Promise<ApiResponse<User>> {
    const response = await api.patch(`${this.endpoint}/profile`, data)
    return response.data
  }

  // Проверка авторизации
  async checkAuth(): Promise<boolean> {
    try {
      await this.getCurrentUser()
      return true
    } catch {
      return false
    }
  }
} 