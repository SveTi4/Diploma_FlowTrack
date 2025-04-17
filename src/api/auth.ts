import { api } from './axios'
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth'

const AUTH_URL = '/auth'

export const authApi = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(`${AUTH_URL}/login`, data)
    return response.data
  },

  async register(data: RegisterRequest): Promise<void> {
    await api.post(`${AUTH_URL}/register`, data)
  },

  async refresh(): Promise<AuthResponse> {
    const response = await api.get<AuthResponse>(`${AUTH_URL}/refresh`)
    return response.data
  }
} 