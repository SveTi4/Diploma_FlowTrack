import React from 'react'
import { FormField } from '../components/FormField/FormField'
import { useForm } from '../hooks/useForm'
import { validateLogin, validateRegister } from '../utils/validation'
import { AuthFormMode, LoginFormValues, RegisterFormValues } from '../types/auth.types'
import { Container, Title, Form, SubmitButton, ToggleButton, Error } from './AuthForm.styles'

interface AuthFormProps {
  mode: AuthFormMode
  onSubmit: (values: LoginFormValues | RegisterFormValues) => Promise<void>
  onToggleMode: () => void
  isLoading?: boolean
  error?: string | null
}

export const AuthForm: React.FC<AuthFormProps> = ({ 
  mode, 
  onSubmit, 
  onToggleMode, 
  isLoading = false,
  error
}) => {
  const isLogin = mode === 'login'

  const initialValues = isLogin
    ? { username: '', password: '' }
    : { username: '', password: '', re_password: '' }

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit: async (values) => {
      if (isLogin) {
        await onSubmit(values as LoginFormValues)
      } else {
        await onSubmit(values as RegisterFormValues)
      }
    },
    validate: isLogin ? validateLogin : validateRegister
  })

  return (
    <Container>
      <Title>{isLogin ? 'Вход' : 'Регистрация'}</Title>
      <Form onSubmit={handleSubmit}>
        {error && <Error>{error}</Error>}
        <FormField
          name="username"
          label="Имя пользователя"
          placeholder='Введите имя пользователя'
          value={values.username}
          onChange={handleChange}
          error={errors.username}
          required
        />
        <FormField
          name="password"
          label="Пароль"
          placeholder='Введите пароль'
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
        {!isLogin && (
          <FormField
            name="re_password"
            label="Подтвердите пароль"
            placeholder='Повторите пароль'
            type="password"
            value={(values as RegisterFormValues).re_password}
            onChange={handleChange}
            error={errors.re_password}
            required
          />
        )}
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
        </SubmitButton>
        <ToggleButton type="button" onClick={onToggleMode}>
          {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
        </ToggleButton>
      </Form>
    </Container>
  )
} 