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
  loadingByColumn: { [column_id: number]: boolean },
  errorByColumn: { [column_id: number]: string | null }
}

const initialState: TasksState = {
  tasksByColumn: {},
  loadingByColumn: {},
  errorByColumn: {}
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

export const moveTask = createAsyncThunk(
  'tasks/moveTask',
  async ({ id, position, column_id }: { id: number; position: number, column_id: number }, { getState }) => {
    const currentState = getState() as { tasks: TasksState }
    const originalTasks = currentState.tasks.tasksByColumn[column_id]?.items || []

    const response = await services.tasks.updateTask(id, {
      position: position,
      column_id: column_id
    })
    return {
      response,
      column_id,
      originalTasks
    }
  }
)

export const changeColumn = createAsyncThunk(
  'tasks/changeColumn',
  async ({ taskId, old_column_id, new_column_id, position }: { taskId: number, old_column_id: number, new_column_id: number, position: number }) => {
    const response = await services.tasks.updateTask(taskId, { column_id: new_column_id, position: position })
    return {
      response,
      old_column_id,
      new_column_id
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
      .addCase(fetchTasks.pending, (state, action) => {
        state.loadingByColumn[action.meta.arg.column_id] = true
        state.errorByColumn[action.meta.arg.column_id] = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const { column_id, data } = action.payload
        state.loadingByColumn[column_id] = false
        state.tasksByColumn[column_id] = {
          items: data.items,
          total: data.total || 0,
          page: data.page || 1,
          limit: data.limit || 10,
          totalPages: data.totalPages || 0
        }
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loadingByColumn[action.meta.arg.column_id] = false
        state.errorByColumn[action.meta.arg.column_id] = action.error.message || 'Произошла ошибка при загрузке задач'
      })
      .addCase(createTask.pending, (state, action) => {
        state.loadingByColumn[action.meta.arg.column_id] = true
        state.errorByColumn[action.meta.arg.column_id] = null
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const { response, column_id } = action.payload
        state.loadingByColumn[column_id] = false
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
        state.loadingByColumn[action.meta.arg.column_id] = false
        state.errorByColumn[action.meta.arg.column_id] = action.error.message || 'Произошла ошибка при добавлении задачи'
      })
      .addCase(updateTask.pending, (state, action) => {
        state.loadingByColumn[action.meta.arg.data.column_id] = true
        state.errorByColumn[action.meta.arg.data.column_id] = null
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { response, column_id } = action.payload
        state.loadingByColumn[column_id] = false
        const columnTasks = state.tasksByColumn[column_id]
        if (columnTasks) {
          const index = columnTasks.items.findIndex(item => Number(item.id) === Number(response.data.id))
          if (index !== -1) {
            columnTasks.items[index] = response.data
          }
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loadingByColumn[action.meta.arg.data.column_id] = false
        state.errorByColumn[action.meta.arg.data.column_id] = action.error.message || 'Произошла ошибка при обновлении задачи'
      })

      .addCase(moveTask.pending, (state, action) => {
        const { id, position, column_id } = action.meta.arg
        const column = state.tasksByColumn[column_id]
        if (!column) return

        // Сохраняем оригинальное состояние для отката
        // action.meta.arg.originalState = {
        //   items: [...column.items],
        //   total: column.total
        // }

        const currentIndex = column.items.findIndex(t => t.id === id)
        if (currentIndex === -1) return

        const newIndex = Math.max(0, Math.min(position - 1, column.items.length - 1))

        // Оптимистичное перемещение
        const newItems = [...column.items]
        const [movedTask] = newItems.splice(currentIndex, 1)
        newItems.splice(newIndex, 0, movedTask)

        // Обновляем позиции
        const updatedItems = newItems.map((t, idx) => ({
          ...t,
          position: idx + 1
        }))

        state.tasksByColumn[column_id].items = updatedItems
        state.loadingByColumn[column_id] = true
        state.errorByColumn[column_id] = null
      })

      .addCase(moveTask.fulfilled, (state, action) => {
        const { response, column_id } = action.payload
        const column = state.tasksByColumn[column_id]
        if (!column) return

        // Синхронизируем с серверными данными
        const updatedTask = response.data
        const newItems = column.items.map(t =>
          t.id === updatedTask.id ? { ...t, ...updatedTask } : t
        )

        state.tasksByColumn[column_id].items = newItems
        state.loadingByColumn[column_id] = false
      })

      .addCase(moveTask.rejected, (state, action) => {
        const { column_id } = action.meta.arg
        // if (originalState && state.tasksByColumn[column_id]) {
        //   // Восстанавливаем оригинальное состояние
        //   state.tasksByColumn[column_id].items = originalState.items
        //   state.tasksByColumn[column_id].total = originalState.total
        // }
        state.loadingByColumn[column_id] = false
        state.errorByColumn[column_id] = action.error.message || 'Ошибка перемещения задачи'
      })

      .addCase(changeColumn.pending, (state, action) => {
        const { taskId, old_column_id, new_column_id, position } = action.meta.arg
        const task = state.tasksByColumn[old_column_id]?.items.find(t => t.id === taskId)

        if (!task) return

        // Оптимистичное обновление старой колонки (1-based → 0-based)
        state.tasksByColumn[old_column_id].items = state.tasksByColumn[old_column_id].items
          .filter(t => t.id !== taskId)
          .map((t, idx) => ({ ...t, position: idx + 1 })) // Обновляем позиции на 1-based

        // Подготовка новой колонки
        const newColumn = state.tasksByColumn[new_column_id] || {
          items: [],
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 1
        }

        // Конвертируем 1-based position в 0-based индекс
        const targetIndex = position - 1
        const newTask = { ...task, column_id: new_column_id, position }
        const newItems = [...newColumn.items]

        // Вставляем и обновляем позиции
        newItems.splice(targetIndex, 0, newTask)
        const updatedItems = newItems.map((t, idx) => ({
          ...t,
          position: idx + 1 // Конвертируем обратно в 1-based
        }))

        state.tasksByColumn[new_column_id] = {
          ...newColumn,
          items: updatedItems,
          total: newColumn.total + 1
        }

        state.loadingByColumn[old_column_id] = true
        state.loadingByColumn[new_column_id] = true
        state.errorByColumn[old_column_id] = null
        state.errorByColumn[new_column_id] = null
      })

      .addCase(changeColumn.fulfilled, (state, action) => {
        const { response, old_column_id, new_column_id } = action.payload
        const updatedTask = response.data

        // Финализация для старой колонки
        if (state.tasksByColumn[old_column_id]) {
          state.tasksByColumn[old_column_id].total -= 1
          state.tasksByColumn[old_column_id].items =
            state.tasksByColumn[old_column_id].items
              .filter(t => t.id !== updatedTask.id)
              .map((t, idx) => ({ ...t, position: idx + 1 }))
        }

        // Финализация для новой колонки
        const newColumn = state.tasksByColumn[new_column_id] || {
          items: [],
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 1
        }

        // Конвертируем 1-based position в 0-based индекс
        const targetIndex = updatedTask.position - 1
        const newItems = newColumn.items
          .filter(t => t.id !== updatedTask.id)

        newItems.splice(targetIndex, 0, updatedTask)

        // Обновляем позиции с конвертацией
        const finalItems = newItems.map((t, idx) => ({
          ...t,
          position: idx + 1 // Важно: сохраняем 1-based!
        }))

        state.tasksByColumn[new_column_id] = {
          ...newColumn,
          items: finalItems,
          total: newColumn.total + (finalItems.length > newColumn.items.length ? 1 : 0)
        }

        state.loadingByColumn[old_column_id] = false
        state.loadingByColumn[new_column_id] = false
      })
      .addCase(changeColumn.rejected, (state, action) => {
        state.loadingByColumn[action.meta.arg.old_column_id] = false
        state.loadingByColumn[action.meta.arg.new_column_id] = false
        state.errorByColumn[action.meta.arg.old_column_id] = action.error.message || 'Произошла ошибка при перемещении задачи'
        state.errorByColumn[action.meta.arg.new_column_id] = action.error.message || 'Произошла ошибка при перемещении задачи'
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.loadingByColumn[action.meta.arg.column_id] = true
        state.errorByColumn[action.meta.arg.column_id] = null
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { id, column_id } = action.payload
        state.loadingByColumn[action.payload.column_id] = false
        const columnTasks = state.tasksByColumn[column_id]
        if (columnTasks) {
          columnTasks.items = columnTasks.items.filter(item => Number(item.id) !== id)
          columnTasks.total -= 1
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loadingByColumn[action.meta.arg.column_id] = false
        state.errorByColumn[action.meta.arg.column_id] = action.error.message || 'Произошла ошибка при удалении задачи'
      })
  }
})

export default tasksSlice.reducer