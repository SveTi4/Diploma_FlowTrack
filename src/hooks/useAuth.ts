import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './useStore'
import { authApi } from '../api/auth'
import { setAccessToken, setError, setLoading, logout } from '../store/auth/authSlice'
import { LoginRequest, RegisterRequest } from '../types/auth'
import { RootState } from '../store'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, loading, error } = useAppSelector((state: RootState) => state.auth)

  const login = async (data: LoginRequest) => {
    try {
      dispatch(setLoading(true))
      const response = await authApi.login(data)
      dispatch(setAccessToken(response.access_token))
      navigate('/home')
    } catch (err) {
      dispatch(setError('Ошибка авторизации'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const register = async (data: RegisterRequest) => {
    try {
      dispatch(setLoading(true))
      await authApi.register(data)
    } catch (err) {
      dispatch(setError('Ошибка регистрации'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const refreshToken = async () => {
    try {
      const response = await authApi.refresh()
      dispatch(setAccessToken(response.access_token))
    } catch (err) {
      dispatch(logout())
    }
  }

  return {
    isAuthenticated,
    loading,
    error,
    login,
    register,
    refreshToken,
    logout: () => dispatch(logout())
  }
} 