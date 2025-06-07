import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './useStore'
import { services } from "../api/services";
import { setAccessToken, setError, setLoading, logout } from '../store/auth/authSlice'
import { LoginDto, RegisterDto } from '../api/services/auth/types'
import { RootState, resetStore } from '../store'

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
    } catch (error) {
      console.error('Login error:', error)
      dispatch(setError('Ошибка авторизации'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const register = async (data: RegisterDto) => {
    try {
      dispatch(setLoading(true))
      await services.auth.register(data)
    } catch (error) {
      console.error('Register error:', error)
      dispatch(setError('Ошибка регистрации'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const refreshToken = async () => {
    try {
      const response = await services.auth.refreshToken()
      dispatch(setAccessToken(response.data.accessToken))
    } catch (error) {
      console.error('Refresh token error:', error)
      dispatch(logout())
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(resetStore())
  }

  return {
    isAuthenticated,
    loading,
    error,
    login,
    register,
    refreshToken,
    logout: handleLogout
  }
} 