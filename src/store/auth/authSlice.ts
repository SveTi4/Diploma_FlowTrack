import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../../types/auth'

const loadState = (): AuthState => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    const username = localStorage.getItem('username')
    return {
      accessToken,
      username,
      isAuthenticated: !!accessToken,
      loading: false,
      error: null
    }
  } catch (e) {
    return {
      accessToken: null,
      username: null,
      isAuthenticated: false,
      loading: false,
      error: null
    }
  }
}

const initialState: AuthState = loadState()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<{ token: string; username: string }>) {
      state.accessToken = action.payload.token
      state.username = action.payload.username
      state.isAuthenticated = true
      localStorage.setItem('accessToken', action.payload.token)
      localStorage.setItem('username', action.payload.username)
    },
    logout(state) {
      state.accessToken = null
      state.username = null
      state.isAuthenticated = false
      localStorage.removeItem('accessToken')
      localStorage.removeItem('username')
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    resetState() {
      return initialState
    }
  }
})

export const { setAccessToken, logout, setLoading, setError, resetState } = authSlice.actions
export default authSlice.reducer 