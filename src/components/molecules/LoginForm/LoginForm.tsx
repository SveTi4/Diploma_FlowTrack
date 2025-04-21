import { useState } from 'react'
import styled from 'styled-components'
import { Input } from '../../atoms/Input/Input'
import { Button } from '../../atoms/Button/Button'
import { useAuth } from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 400px;
  padding: 32px;
  background: #121316;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const ErrorMessage = styled.div`
  color: #FF3B30;
  font-size: 14px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ username, password })
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
      <Button disabled={loading} type="submit">
        {loading ? 'Загрузка...' : 'Войти'}
      </Button>
      <Button 
        variant="secondary" 
        type="button" 
        onClick={() => navigate('/register')}
      >
        Регистрация
      </Button>
    </Form>
  )
} 