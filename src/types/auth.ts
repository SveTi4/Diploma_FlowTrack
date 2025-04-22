// export interface LoginRequest {
//   username: string
//   password: string
// }

// export interface RegisterRequest extends LoginRequest {
//   re_password: string
// }
//
// export interface AuthResponse {
//   access_token: string
// }

export interface AuthState {
  accessToken: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
} 