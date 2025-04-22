// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
// import { Task, TasksResponse } from '../../types/column'
// import { tasksApi } from '../../api/tasks'
//
// interface TasksState {
//   items: { [columnId: number]: Task[] }
//   loading: { [columnId: number]: boolean }
//   error: { [columnId: number]: string | null }
// }
//
// const initialState: TasksState = {
//   items: {},
//   loading: {},
//   error: {}
// }
//
// export const fetchColumnTasks = createAsyncThunk(
//   'tasks/fetchColumnTasks',
//   async ({ columnId, params }: { columnId: number; params?: { page?: number; limit?: number } }): Promise<{ columnId: number; response: TasksResponse }> => {
//     const response = await tasksApi.getColumnTasks(columnId, params)
//     return { columnId, response }
//   }
// )
//
// export const deleteTask = createAsyncThunk(
//   'tasks/deleteTask',
//   async ({ taskId, columnId }: { taskId: number; columnId: number }) => {
//     await tasksApi.deleteTask(taskId)
//     return { taskId, columnId }
//   }
// )
//
// const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchColumnTasks.pending, (state, action) => {
//         const columnId = action.meta.arg.columnId
//         state.loading[columnId] = true
//         state.error[columnId] = null
//       })
//       .addCase(fetchColumnTasks.fulfilled, (state, action) => {
//         const { columnId, response } = action.payload
//         state.loading[columnId] = false
//         state.items[columnId] = response.items
//       })
//       .addCase(fetchColumnTasks.rejected, (state, action) => {
//         const columnId = action.meta.arg.columnId
//         state.loading[columnId] = false
//         state.error[columnId] = action.error.message || 'Произошла ошибка при загрузке задач'
//       })
//       .addCase(deleteTask.fulfilled, (state, action) => {
//         const { taskId, columnId } = action.payload
//         state.items[columnId] = state.items[columnId].filter(task => task.id !== taskId)
//       })
//   }
// })
//
// export default tasksSlice.reducer