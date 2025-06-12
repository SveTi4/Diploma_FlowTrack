import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { services } from '../../api/services'
import { ApiResponse } from '../../api/types/response.types'
import { HeatMapData } from '../../api/services'

interface HeatmapState {
  data: HeatMapData | null
  loading: boolean
  error: string | null
}

const initialState: HeatmapState = {
  data: null,
  loading: false,
  error: null
}

export const fetchHeatmap = createAsyncThunk(
  'heatmap/fetchHeatmap',
  async (): Promise<ApiResponse<HeatMapData>> => {
    return await services.heatmap.getHeatMap()
  }
)

const heatmapSlice = createSlice({
  name: 'heatmap',
  initialState,
  reducers: {
    clearHeatmap: (state) => {
      state.data = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeatmap.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchHeatmap.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
        console.log("Debug-heatmap: state.data:", state.data[200])
      })
      .addCase(fetchHeatmap.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Произошла ошибка при загрузке heatmap'
      })
  }
})

export const { clearHeatmap } = heatmapSlice.actions
export default heatmapSlice.reducer
