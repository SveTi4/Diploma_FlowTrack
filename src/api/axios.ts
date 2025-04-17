import axios from 'axios'
import { store } from '../store'
import { setAccessToken, logout } from '../store/auth/authSlice'
import { debounce } from '../utils/debounce'

const PUBLIC_ROUTES = ['/auth/login', '/auth/register', '/auth/refresh']

export const api = axios.create({
  baseURL: 'http://62.60.236.68:5000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Дебаунсированная функция обновления токена
const refreshTokenDebounced = debounce(async () => {
  try {
    const response = await api.get('/auth/refresh')
    const { access_token } = response.data
    store.dispatch(setAccessToken(access_token))
    return access_token
  } catch (err) {
    store.dispatch(logout())
    throw err
  }
}, 1000) // Минимальный интервал между запросами - 1 секунда

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

    // Если 401 и это не запрос на обновление токена и не было попытки обновить токен
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      !PUBLIC_ROUTES.includes(originalRequest.url || '')
    ) {
      originalRequest._retry = true

      try {
        const newToken = await refreshTokenDebounced()
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (err) {
        // Если не удалось обновить токен, выходим из системы
        window.location.href = '/'
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
) 