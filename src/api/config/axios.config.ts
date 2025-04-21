import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { API_CONFIG, HTTP_STATUS } from './api.config'
import { store } from '../../store'
import { setAccessToken, logout } from '../../store/auth/authSlice'
import { debounce } from '../../utils/debounce'

// Создаем экземпляр axios
const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
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
}, API_CONFIG.RETRY_DELAY)

// Функция повторной попытки запроса
const retryRequest = async (error: AxiosError, retryCount: number = 0): Promise<AxiosResponse> => {
  const config = error.config

  if (!config || retryCount >= API_CONFIG.RETRY_ATTEMPTS) {
    throw error
  }

  // Ждем перед повторной попыткой
  await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY * (retryCount + 1)))
  
  return api(config)
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const url = config.url as string
    console.log('Request URL:', url)
    console.log('Is public route:', API_CONFIG.PUBLIC_ROUTES.some(route => url?.includes(route)))
    
    if (url && !API_CONFIG.PUBLIC_ROUTES.some(route => url?.includes(route))) {
      const state = store.getState()
      console.log('Full Redux State:', state)
      console.log('Auth State:', state.auth)
      const { accessToken } = state.auth
      console.log('Access Token:', accessToken)
      
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
        console.log('Added Authorization header:', config.headers.Authorization)
      } else {
        console.log('No access token available')
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any

    // Если ошибка сети или таймаут, пробуем повторить запрос
    if (axios.isAxiosError(error) && !error.response) {
      return retryRequest(error)
    }

    // Если 401 и это не запрос на обновление токена
    const url = originalRequest?.url as string
    if (
      error.response?.status === HTTP_STATUS.UNAUTHORIZED && 
      originalRequest && 
      !originalRequest._retry &&
      !API_CONFIG.PUBLIC_ROUTES.some(route => url?.includes(route))
    ) {
      originalRequest._retry = true

      try {
        const newToken = await refreshTokenDebounced()
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
        }
        return api(originalRequest)
      } catch (refreshError) {
        store.dispatch(logout())
        window.location.href = '/'
        return Promise.reject(refreshError)
      }
    }

    // Обработка других ошибок
    const errorData = error.response?.data as Record<string, any> || {}
    const errorResponse = {
      code: errorData.code || 'UNKNOWN_ERROR',
      message: errorData.message || 'Произошла неизвестная ошибка',
      details: errorData.details,
      status: error.response?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR
    }

    return Promise.reject(errorResponse)
  }
)

export { api } 