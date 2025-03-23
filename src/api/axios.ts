import axios from 'axios'
import { store } from '../store'
import { setAccessToken, logout } from '../store/auth/authSlice'

const PUBLIC_ROUTES = ['/auth/login', '/auth/register']

export const api = axios.create({
  baseURL: 'http://192.168.0.102:7000/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Добавляем токен только для защищенных маршрутов
api.interceptors.request.use((config) => {
  if (config.url && !PUBLIC_ROUTES.includes(config.url)) {
    const { accessToken } = store.getState().auth
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
  }
  return config
})

// Обрабатываем ошибки и обновляем токен
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Если 401 и это не запрос на обновление токена
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await api.get('/auth/refresh')
        const { access_token } = response.data
        
        store.dispatch(setAccessToken(access_token))
        originalRequest.headers.Authorization = `Bearer ${access_token}`
        
        return api(originalRequest)
      } catch (err) {
        store.dispatch(logout())
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
) 