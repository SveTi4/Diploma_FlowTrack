import { configureStore, combineReducers, Action } from '@reduxjs/toolkit'
import projectsReducer from './projects/projectsSlice'
import projectMetricsReducer from './projects/projectMetricsSlice'
import projectProductivityReducer from './projects/projectProductivitySlice'
import authReducer from './auth/authSlice'
import tasksReducer from './tasks/tasksSlice'
import columnsReducer from './columns/columnsSlice'

const rootReducer = combineReducers({
  projects: projectsReducer,
  projectMetrics: projectMetricsReducer,
  projectProductivity: projectProductivityReducer,
  auth: authReducer,
  tasks: tasksReducer,
  columns: columnsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

// Экшен для сброса стора
export const resetStore = () => ({ type: 'RESET_STORE' as const })

// Создаем новый редьюсер, который будет сбрасывать весь стор
const reducer = (state: RootState | undefined, action: Action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined
  }
  return rootReducer(state, action)
}

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch 