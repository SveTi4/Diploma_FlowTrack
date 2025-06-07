import { configureStore, combineReducers, Action } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import projectsReducer from './projects/projectsSlice'
import tasksReducer from './tasks/tasksSlice'
import columnsReducer from './columns/columnsSlice'
import projectProgressReducer from './projects/projectProgressSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
  columns: columnsReducer,
  projectProgress: projectProgressReducer
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