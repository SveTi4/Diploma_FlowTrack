import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../../types/auth'

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload
      state.isAuthenticated = true
    },
    logout(state) {
      state.accessToken = null
      state.isAuthenticated = false
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