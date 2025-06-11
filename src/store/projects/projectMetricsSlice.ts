import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { services, ProjectMetrics } from '../../api/services'
import { ApiResponse } from '../../api/types/response.types'

interface ProjectMetricsState {
  metrics: ProjectMetrics | null
  loading: boolean
  error: string | null
}

const initialState: ProjectMetricsState = {
  metrics: null,
  loading: false,
  error: null
}

export const fetchProjectMetrics = createAsyncThunk(
  'projectMetrics/fetchMetrics',
  async (projectId: number): Promise<ApiResponse<ProjectMetrics>> => {
    return await services.projects.getProjectMetrics(projectId)
  }
)

const projectMetricsSlice = createSlice({
  name: 'projectMetrics',
  initialState,
  reducers: {
    clearProjectMetrics: (state) => {
      state.metrics = null
      state.loading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectMetrics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjectMetrics.fulfilled, (state, action) => {
        state.loading = false
        state.metrics = action.payload.data
      })
      .addCase(fetchProjectMetrics.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка при загрузке метрик проекта'
      })
  }
})

export const { clearProjectMetrics } = projectMetricsSlice.actions
export default projectMetricsSlice.reducer 