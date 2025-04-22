// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
// import { Column, ColumnsResponse } from '../../types/column'
// import { columnsApi } from '../../api/columns'
//
// interface ColumnsState {
//   items: Column[]
//   total: number
//   page: number
//   limit: number
//   loading: boolean
//   error: string | null
// }
//
// const initialState: ColumnsState = {
//   items: [],
//   total: 0,
//   page: 1,
//   limit: 10,
//   loading: false,
//   error: null
// }
//
// export const fetchColumns = createAsyncThunk(
//   'columns/fetchColumns',
//   async ({ projectId, params }: { projectId: number; params?: { page?: number; limit?: number } }): Promise<ColumnsResponse> => {
//     return await columnsApi.getColumns(projectId, params)
//   }
// )
//
// export const createColumn = createAsyncThunk(
//   'columns/createColumn',
//   async ({ name, projectId }: { name: string; projectId: number }) => {
//     return await columnsApi.createColumn({ name, project_id: projectId })
//   }
// )
//
// const columnsSlice = createSlice({
//   name: 'columns',
//   initialState,
//   reducers: {
//     setError(state, action: PayloadAction<string | null>) {
//       state.error = action.payload
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchColumns.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(fetchColumns.fulfilled, (state, action) => {
//         state.loading = false
//         state.items = action.payload.items
//         state.total = action.payload.total || action.payload.items.length
//         state.page = action.payload.page || 1
//         state.limit = action.payload.limit || 10
//       })
//       .addCase(fetchColumns.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.error.message || 'Произошла ошибка при загрузке колонок'
//       })
//       .addCase(createColumn.fulfilled, (state, action) => {
//         state.items.push(action.payload)
//       })
//   }
// })
//
// export const { setError } = columnsSlice.actions
// export default columnsSlice.reducer