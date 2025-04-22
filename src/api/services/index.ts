import { ProjectsService } from './projects/projects.service'
import { AuthService } from './auth/auth.service'
import {TasksService} from "./tasks/tasks.service.ts";

// Создаем экземпляры сервисов
export const projectsService = new ProjectsService()
export const authService = new AuthService()
export const tasksService = new TasksService()
// Экспортируем типы
export * from './projects/types'
export * from './auth/types'
export * from './tasks/types'

// Экспортируем все сервисы
export const services = {
  projects: projectsService,
  tasks: tasksService,
  auth: authService
}