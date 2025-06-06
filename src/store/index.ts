import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from './projects/projectsSlice'
import tasksReducer from './tasks/tasksSlice'
import authReducer from './auth/authSlice'
import columnsReducer from './columns/columnsSlice'
import projectProgressReducer from './projects/projectProgressSlice'

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    auth: authReducer,
    columns: columnsReducer,
    projectProgress: projectProgressReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 