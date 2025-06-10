import React, { useState } from 'react'
import { AuthForm, LoginFormValues, RegisterFormValues, AuthFormMode  } from '../../molecules'
import { Container } from './AuthPage.styles'
import { useAuth } from '../../../hooks/useAuth'

export const AuthPage: React.FC = () => {
  const { login, register, loading, error } = useAuth()
  const [mode, setMode] = useState<AuthFormMode>('login')

  const handleSubmit = async (values: LoginFormValues | RegisterFormValues) => {
    try {
      if (mode === 'login') {
        await login(values)
      } else {
        await register(values as RegisterFormValues)
        setMode('login')
      }
    } catch (error) {
      console.error('Auth error:', error)
    }
  }

  const handleToggleMode = () => {
    setMode(prev => prev === 'login' ? 'register' : 'login')
  }

  return (
    <Container>
      <AuthForm
        mode={mode}
        onSubmit={handleSubmit}
        onToggleMode={handleToggleMode}
        isLoading={loading}
        error={error}
      />
    </Container>
  )
} 