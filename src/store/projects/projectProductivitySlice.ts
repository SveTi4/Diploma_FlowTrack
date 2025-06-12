import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { services } from '../../api/services'
import { ProductivityData } from '../../api/services'
import { ApiResponse } from '../../api/types/response.types'

interface ProjectProductivityState {
  data: ProductivityData | null
  loading: boolean
  error: string | null
}

const initialState: ProjectProductivityState = {
  data: null,
  loading: false,
  error: null
}

export const fetchProjectProductivity = createAsyncThunk(
  'projectProductivity/fetchProjectProductivity',
  async (projectId: number): Promise<ApiResponse<ProductivityData>> => {
    return await services.projects.getProjectProductivity(projectId)
  }
)

const projectProductivitySlice = createSlice({
  name: 'projectProductivity',
  initialState,
  reducers: {
    clearProductivityData: (state) => {
      state.data = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectProductivity.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjectProductivity.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
      })
      .addCase(fetchProjectProductivity.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка при загрузке данных продуктивности'
      })
  }
})

export const { clearProductivityData } = projectProductivitySlice.actions
export default projectProductivitySlice.reducer 