import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Task, CreateTaskDto, UpdateTaskDto, services } from '../../api/services'
import { ApiResponse } from '../../api/types/response.types'

interface TasksByColumn {
  [column_id: number]: {
    items: Task[]
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

interface TasksState {
  tasksByColumn: TasksByColumn
  loading: boolean
  error: string | null
}

const initialState: TasksState = {
  tasksByColumn: {},
  loading: false,
  error: null
}

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ column_id, params }: { column_id: number; params: { page: number; limit: number } }) => {
    const response = await services.tasks.getTasks(column_id, params)
    return {
      data: response.data,
      status: response.status,
      column_id: column_id
    }
  }
)

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (data: CreateTaskDto): Promise<{ response: ApiResponse<Task>, column_id: number }> => {
    const response = await services.tasks.createTask(data)
    return {
      response,
      column_id: data.column_id
    }
  }
)

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, data }: { id: number; data: UpdateTaskDto }) => {
    const response = await services.tasks.updateTask(id, data)
    return {
      response,
      column_id: data.column_id
    }
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ id, column_id }: { id: number, column_id: number }) => {
    await services.tasks.deleteTask(id)
    return { id, column_id }
  }
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const { column_id, data } = action.payload
        state.loading = false
        state.tasksByColumn[column_id] = {
          items: data.items,
          total: data.total || 0,
          page: data.page || 1,
          limit: data.limit || 10,
          totalPages: data.totalPages || 0
        }
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Произошла ошибка при загрузке задач'
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const { response, column_id } = action.payload
        state.loading = false
        if (response && response.data) {
          const columnTasks = state.tasksByColumn[column_id] || { items: [], total: 0, page: 1, limit: 10, totalPages: 1 }
          state.tasksByColumn[column_id] = {
            ...columnTasks,
            items: [...columnTasks.items, response.data],
            total: columnTasks.total + 1
          }
        }
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Произошла ошибка при добавлении задачи'
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { response, column_id } = action.payload
        state.loading = false
        const columnTasks = state.tasksByColumn[column_id]
        if (columnTasks) {
          const index = columnTasks.items.findIndex(item => Number(item.id) === Number(response.data.id))
          if (index !== -1) {
            columnTasks.items[index] = response.data
          }
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Произошла ошибка при обновлении задачи'
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { id, column_id } = action.payload
        state.loading = false
        const columnTasks = state.tasksByColumn[column_id]
        if (columnTasks) {
          columnTasks.items = columnTasks.items.filter(item => Number(item.id) !== id)
          columnTasks.total -= 1
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Произошла ошибка при удалении задачи'
      })
  }
})

export default tasksSlice.reducer