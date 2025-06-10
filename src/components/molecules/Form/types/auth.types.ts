export interface LoginFormValues {
  username: string
  password: string
}

export interface RegisterFormValues extends LoginFormValues {
  re_password: string
}

export type AuthFormMode = 'login' | 'register'

export type FormValues = LoginFormValues | RegisterFormValues
export type FormErrors = {
  username?: string
  password?: string
  re_password?: string
} 