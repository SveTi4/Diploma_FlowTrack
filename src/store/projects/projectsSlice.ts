import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Project, ProjectsParams } from '../../types/project'
import { projectsApi } from '../../api/projects'

interface ProjectsState {
  items: Project[]
  total: number
  page: number
  limit: number
  loading: boolean
  error: string | null
}

const initialState: ProjectsState = {
  items: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null
}

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (params: ProjectsParams = {}) => {
    const response = await projectsApi.getProjects(params)
    // API возвращает массив проектов напрямую, без обертки
    return {
      items: response,
      total: response.length,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }
)

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
        state.total = action.payload.total
        state.page = action.payload.page
        state.limit = action.payload.limit
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Произошла ошибка при загрузке проектов'
      })
  }
})

export const { setError } = projectsSlice.actions
export default projectsSlice.reducer 