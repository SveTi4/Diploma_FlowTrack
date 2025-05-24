import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'
import {Column, CreateColumnDto, services, UpdateColumnDto} from "../../api/services";
import {ApiResponse} from "../../api/types/response.types.ts";

interface ColumnsState {
  items: Column[]
  total: number
  page: number
  limit: number
  totalPages: number
  loading: boolean
  error: string | null
  movingColumnId: number | null
}

const initialState: ColumnsState = {
  items: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  loading: false,
  error: null,
  movingColumnId: null
}

export const fetchColumns = createAsyncThunk(
  'columns/fetchColumns',
  async ({ project_id, params }: { project_id: number; params: { page: number; limit: number } }) => {
    const response = await services.columns.getColumns(project_id, params)
    console.log('API Response columns:', response)
    return response
  }
)

export const createColumn = createAsyncThunk(
  'columns/createColumn',
  async (data: CreateColumnDto): Promise<ApiResponse<Column>> => {
    const response = await services.columns.createColumn(data)
    console.log('Create column response:', response)
    return response
  }
)

export const updateColumn = createAsyncThunk(
  'columns/updateColumn',
  async ({ id, data }: { id: number; data: UpdateColumnDto }) => {
    return await services.columns.updateColumn(id, data)
  }
)

export const moveColumn = createAsyncThunk(
  'columns/moveColumn',
  async ({ id, position }: { id: number; position: number }, { getState }) => {
    const currentState = getState() as { columns: ColumnsState }
    const originalColumns = currentState.columns.items

    const response = await services.columns.updateColumn(id, {
      position: position
    })
    return {
      response,
      id,
      originalColumns
    }
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data.items
        state.total = action.payload.data.total || 0
        state.page = action.payload.data.page || 1
        state.limit = action.payload.data.limit || 999
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
        if (action.payload && action.payload.data) {
          state.items = [...state.items, action.payload.data]
          state.total += 1
        }
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
        state.total -= 1
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Произошла ошибка при удалении колонки'
      })  
      .addCase(updateColumn.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        state.loading = false
        const index = state.items.findIndex(item => Number(item.id) === Number(action.payload.data.id))
        if (index !== -1) {
          state.items[index] = action.payload.data
        }
      })
      .addCase(updateColumn.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Произошла ошибка при обновлении колонки'
      })
      .addCase(moveColumn.pending, (state, action) => {
        const { id, position } = action.meta.arg
        state.movingColumnId = id
        
        // Оптимистичное обновление
        const currentIndex = state.items.findIndex(item => Number(item.id) === id)
        if (currentIndex === -1) return

        const newItems = [...state.items]
        const [movedColumn] = newItems.splice(currentIndex, 1)
        
        // Просто вставляем колонку на новую позицию (учитывая что позиции 1-based)
        const targetIndex = Math.min(Math.max(0, position - 1), newItems.length)
        newItems.splice(targetIndex, 0, movedColumn)

        // Обновляем позиции всех колонок (1-based)
        state.items = newItems.map((item, idx) => ({
          ...item,
          position: idx + 1
        }))
      })
      .addCase(moveColumn.fulfilled, (state, action) => {
        state.movingColumnId = null
        const { response, id } = action.payload
        const index = state.items.findIndex(item => Number(item.id) === Number(id))
        if (index !== -1) {
          // Обновляем только перемещенную колонку
          state.items[index] = response.data
        }
      })
      .addCase(moveColumn.rejected, (state, action) => {
        state.movingColumnId = null
        state.error = action.error.message || 'Произошла ошибка при перемещении колонки'
        
        // Восстанавливаем исходный порядок
        const payload = action.payload as { originalColumns: Column[] } | undefined
        if (payload?.originalColumns) {
          state.items = payload.originalColumns.map((item, idx) => ({
            ...item,
            position: idx + 1
          }))
        }
      })
  }
})

// Базовые селекторы
const selectColumnsState = (state: { columns: ColumnsState }) => state.columns

// Мемоизированные селекторы
export const selectColumnsByProject = createSelector(
  [selectColumnsState, (_, projectId: number) => projectId],
  (columnsState, projectId) => 
    columnsState.items
      .filter(column => column.project_id === projectId)
      .sort((a, b) => a.position - b.position)
)

export const selectColumnById = createSelector(
  [selectColumnsState, (_, id: number) => id],
  (columnsState, id) => 
    columnsState.items.find(column => Number(column.id) === id)
)

export const selectIsColumnMoving = createSelector(
  [selectColumnsState, (_, id: number) => id],
  (columnsState, id) => columnsState.movingColumnId === id
)

export default columnsSlice.reducer