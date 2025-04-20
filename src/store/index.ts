import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import projectsReducer from './projects/projectsSlice'
import columnsReducer from './columns/columnsSlice'
import tasksReducer from './tasks/tasksSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    columns: columnsReducer,
    tasks: tasksReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 