import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../../types/auth'

const loadState = (): AuthState => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    return {
      accessToken,
      isAuthenticated: !!accessToken,
      loading: false,
      error: null
    }
  } catch (e) {
    return {
      accessToken: null,
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
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload
      state.isAuthenticated = true
      localStorage.setItem('accessToken', action.payload)
    },
    logout(state) {
      state.accessToken = null
      state.isAuthenticated = false
      localStorage.removeItem('accessToken')
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    }
  }
})

export const { setAccessToken, logout, setLoading, setError } = authSlice.actions
export default authSlice.reducer 