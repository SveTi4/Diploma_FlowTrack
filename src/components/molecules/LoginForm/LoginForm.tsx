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
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Имя пользователя"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <Button disabled={loading}>
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