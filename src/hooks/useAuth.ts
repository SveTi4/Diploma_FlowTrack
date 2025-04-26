import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './useStore'
import { services } from "../api/services";
import { setAccessToken, setError, setLoading, logout } from '../store/auth/authSlice'
import { LoginDto, RegisterDto } from '../api/services/auth/types'
import { RootState } from '../store'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, loading, error } = useAppSelector((state: RootState) => state.auth)

  const login = async (data: LoginDto) => {
    try {
      dispatch(setLoading(true))
      const response = await services.auth.login(data)
      dispatch(setAccessToken(response.data.access_token))
      navigate('/projects')
    } catch (err) {
      dispatch(setError('Ошибка авторизации'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const register = async (data: RegisterDto) => {
    try {
      dispatch(setLoading(true))
      await services.auth.register(data)
    } catch (err) {
      dispatch(setError('Ошибка регистрации'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const refreshToken = async () => {
    try {
      const response = await services.auth.refreshToken()
      dispatch(setAccessToken(response.data.accessToken))
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