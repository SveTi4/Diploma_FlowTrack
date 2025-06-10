import { FormValues, FormErrors, RegisterFormValues } from '../types/auth.types'

export const validateLogin = (values: FormValues): FormErrors => {
  const errors: FormErrors = {}

  if (!values.username) {
    errors.username = 'Имя пользователя обязательно'
  }

  if (!values.password) {
    errors.password = 'Пароль обязателен'
  } else if (values.password.length < 6) {
    errors.password = 'Пароль должен быть не менее 6 символов'
  }

  return errors
}

export const validateRegister = (values: FormValues): FormErrors => {
  const errors = validateLogin(values)
  const registerValues = values as RegisterFormValues

  if (!registerValues.re_password) {
    errors.re_password = 'Подтверждение пароля обязательно'
  } else if (registerValues.password !== registerValues.re_password) {
    errors.re_password = 'Пароли не совпадают'
  }

  return errors
} 