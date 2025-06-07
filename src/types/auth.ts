export interface AuthState {
  accessToken: string | null
  username: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
} 