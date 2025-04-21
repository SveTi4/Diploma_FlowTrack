import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { services } from '../../../api/services'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const location = useLocation()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await services.auth.checkAuth()
        setIsAuthenticated(isAuth)
      } catch {
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  if (isAuthenticated === null) {
    // Можно добавить компонент загрузки
    return <div>Загрузка...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <>{children}</>
} 