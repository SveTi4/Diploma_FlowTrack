import { ProjectsService } from './projects/projects.service'
import { AuthService } from './auth/auth.service'
import {ColumnsService} from "./columns/columns.service.ts";
import { TasksService } from './tasks/tasks.service.ts';

// Создаем экземпляры сервисов
export const projectsService = new ProjectsService()
export const authService = new AuthService()
export const columnService = new ColumnsService()
export const tasksService = new TasksService()

// Экспортируем типы
export * from './projects/types'
export * from './auth/types'
export * from './columns/types'
export * from './tasks/types'

// Экспортируем все сервисы
export const services = {
  projects: projectsService,
  columns: columnService,
  tasks: tasksService,
  auth: authService
}