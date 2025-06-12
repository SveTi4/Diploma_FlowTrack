import { AuthService } from './auth/auth.service'
import { ProjectsService } from './projects/projects.service'
import { ColumnsService } from "./columns/columns.service.ts";
import { TasksService } from './tasks/tasks.service.ts';
import { HeatmapService } from "./heatmap/heatmap.service.ts";

// Создаем экземпляры сервисов
export const authService = new AuthService()
export const projectsService = new ProjectsService()
export const columnService = new ColumnsService()
export const tasksService = new TasksService()
export const heatmapService = new HeatmapService()

// Экспортируем типы
export * from './auth/types'
export * from './projects/types'
export * from './columns/types'
export * from './tasks/types'
export * from './heatmap/types'

// Экспортируем все сервисы
export const services = {
  auth: authService,
  projects: projectsService,
  columns: columnService,
  tasks: tasksService,
  heatmap: heatmapService
}