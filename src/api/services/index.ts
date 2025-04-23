import { ProjectsService } from './projects/projects.service'
import { AuthService } from './auth/auth.service'
import {ColumnsService} from "./columns/columns.service.ts";

// Создаем экземпляры сервисов
export const projectsService = new ProjectsService()
export const authService = new AuthService()
export const columnService = new ColumnsService()

// Экспортируем типы
export * from './projects/types'
export * from './auth/types'
export * from './columns/types'

// Экспортируем все сервисы
export const services = {
  projects: projectsService,
  columns: columnService,
  auth: authService
}