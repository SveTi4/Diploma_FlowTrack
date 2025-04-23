import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {Column, CreateColumnDto, services} from "../../api/services";
import {ApiResponse} from "../../api/types/response.types.ts";

interface ColumnsState {
  items: Column[]
  total: number
  page: number
  limit: number
  totalPages: number
  loading: boolean
  error: string | null
}

const initialState: ColumnsState = {
  items: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  loading: false,
  error: null,
}

export const fetchColumns = createAsyncThunk(
  'columns/fetchColumns',
  async ({ projectId, params }: { projectId: number; params: { page: number; limit: number } }) => {
    const response = await services.columns.getColumns(projectId, params)
    console.log('API Response columns:', response)
    return response
    // return await services.columns.getColumns(projectId, params)
  }
)

export const createColumn = createAsyncThunk(
  'columns/createColumn',
  async (data: CreateColumnDto): Promise<ApiResponse<Column>> => {
    return await services.columns.createColumn(data)
  }
)

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async (id: number) => {
    await services.columns.deleteColumn(id)
    return id // Возвращаем id удаленной колонки
  }
)

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    createColumn1: () => {
      console.log("Create column")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        console.log('Action payload columns:', action.payload)
        state.loading = false
        state.items = action.payload.data.items
        state.total = action.payload.data.total || 0
        state.page = action.payload.data.page || 1
        state.limit = action.payload.data.limit || 10
        state.totalPages = action.payload.data.totalPages || 0
      })
      .addCase(fetchColumns.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Произошла ошибка при загрузке колонок'
      })
      .addCase(createColumn.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.loading = false
        state.items.push(action.payload.data)
      })
      .addCase(createColumn.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Произошла ошибка при добавлении колонки'
      })
      .addCase(deleteColumn.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter(item => Number(item.id) !== action.payload)
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Произошла ошибка при удалении колонки'
      })  
  }
})

export const { createColumn1 } = columnsSlice.actions
export default columnsSlice.reducer