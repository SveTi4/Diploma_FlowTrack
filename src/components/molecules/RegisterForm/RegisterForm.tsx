import { useState } from 'react'
import styled from 'styled-components'
import { Input } from '../../atoms/Input/Input'
import { Button } from '../../atoms/Button/Button'
import { useAuth } from '../../../hooks/useAuth'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 400px;
`

export const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const { register, loading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await register({ username, password, re_password: rePassword })
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
      <Input
        type="password"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        placeholder="Повторите пароль"
      />
      <Button disabled={loading}>
        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
      </Button>
      <Button variant="secondary" type="button" onClick={() => window.history.back()}>
        Назад
      </Button>
    </Form>
  )
} 