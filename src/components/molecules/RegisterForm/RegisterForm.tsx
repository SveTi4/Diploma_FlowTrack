import { useState } from 'react'
import styled from 'styled-components'
import { Input } from '../../atoms/Input/Input'
import { Button } from '../../atoms/Button/Button'
import { useAuth } from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  width: 100%;
  max-width: 400px;
  padding: 32px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: ${({ theme }) => theme.colors.border} solid 1px;

  &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
  }
  &:focus-within {
      border-color: ${({ theme }) => theme.colors.primary};
  }
`

const ErrorMessage = styled.div`
  color: #FF3B30;
  font-size: 14px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`

export const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { register, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return
    }
    await register({ username, password, re_password: confirmPassword })
    navigate('/')
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Логин"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <Input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Подтвердите пароль"
      />
      <Button disabled={loading} type="submit">
        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
      </Button>
      <Button 
        variant="secondary" 
        type="button" 
        onClick={() => navigate('/')}
      >
        Войти
      </Button>
    </Form>
  )
} 