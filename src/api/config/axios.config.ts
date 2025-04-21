import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { API_CONFIG, HTTP_STATUS } from './api.config'
import { store } from '../../store'
import { setAccessToken, logout } from '../../store/auth/authSlice'
import { debounce } from '../../utils/debounce'

// Создаем экземпляр axios
export const axiosInstance: AxiosInstance = axios.create({
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
    const response = await axiosInstance.get('/auth/refresh')
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
  
  return axiosInstance(config)
}

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url && !API_CONFIG.PUBLIC_ROUTES.includes(config.url)) {
      const { accessToken } = store.getState().auth
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config

    // Если ошибка сети или таймаут, пробуем повторить запрос
    if (axios.isAxiosError(error) && !error.response) {
      return retryRequest(error)
    }

    // Если 401 и это не запрос на обновление токена
    if (
      error.response?.status === HTTP_STATUS.UNAUTHORIZED && 
      originalRequest && 
      !originalRequest._retry &&
      !API_CONFIG.PUBLIC_ROUTES.includes(originalRequest.url || '')
    ) {
      originalRequest._retry = true

      try {
        const newToken = await refreshTokenDebounced()
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
        }
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        store.dispatch(logout())
        window.location.href = '/'
        return Promise.reject(refreshError)
      }
    }

    // Обработка других ошибок
    const errorResponse = {
      code: error.response?.data?.code || 'UNKNOWN_ERROR',
      message: error.response?.data?.message || 'Произошла неизвестная ошибка',
      details: error.response?.data?.details,
      status: error.response?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR
    }

    return Promise.reject(errorResponse)
  }
)

export const api = axiosInstance 