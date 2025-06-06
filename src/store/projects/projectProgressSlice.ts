import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { services } from '../../api/services'
import { ProjectProgress, ProjectBurndownData } from '../../api/services/projects/types'
import { ApiResponse } from '../../api/types/response.types'

interface ProjectProgressState {
  progress: ProjectProgress | null
  burndownData: ProjectBurndownData | null
  loading: boolean
  error: string | null
}

const initialState: ProjectProgressState = {
  progress: null,
  burndownData: null,
  loading: false,
  error: null
}

export const fetchProjectProgress = createAsyncThunk(
  'projectProgress/fetchProgress',
  async (projectId: number): Promise<ApiResponse<ProjectProgress>> => {
    return await services.projects.getProjectProgress(projectId)
  }
)

export const fetchProjectBurndown = createAsyncThunk(
  'projectProgress/fetchBurndown',
  async (projectId: number): Promise<ApiResponse<ProjectBurndownData>> => {
    return await services.projects.getProjectBurndown(projectId)
  }
)

const projectProgressSlice = createSlice({
  name: 'projectProgress',
  initialState,
  reducers: {
    clearProjectProgress: (state) => {
      state.progress = null
      state.burndownData = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Обработка прогресса
      .addCase(fetchProjectProgress.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjectProgress.fulfilled, (state, action) => {
        state.loading = false
        state.progress = action.payload.data
      })
      .addCase(fetchProjectProgress.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка при загрузке прогресса проекта'
      })
      // Обработка данных бёрндауна
      .addCase(fetchProjectBurndown.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjectBurndown.fulfilled, (state, action) => {
        state.loading = false
        state.burndownData = action.payload.data
      })
      .addCase(fetchProjectBurndown.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка при загрузке данных бёрндауна'
      })
  }
})

export const { clearProjectProgress } = projectProgressSlice.actions
export default projectProgressSlice.reducer 