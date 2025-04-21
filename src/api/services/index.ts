import { ProjectsService } from './projects/projects.service'
import { AuthService } from './auth/auth.service'

// Создаем экземпляры сервисов
export const projectsService = new ProjectsService()
export const authService = new AuthService()

// Экспортируем типы
export * from './projects/types'
export * from './auth/types'

// Экспортируем все сервисы
export const services = {
  projects: projectsService,
  auth: authService
} 