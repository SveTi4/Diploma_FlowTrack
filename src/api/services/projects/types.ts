export type ProjectStatus = 'active' | 'archived' | 'completed' | 'draft';
export type ProjectPriority = 'low' | 'medium' | 'high';

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  createdAt: string;
  updatedAt: string;
  deadline?: string;
  teamSize?: number;
  progress: number;
  ownerId: string;
  tags?: string[];
  archived: boolean;
}

export interface CreateProjectDto {
  title: string;
  description?: string;
  priority?: ProjectPriority;
  deadline?: string;
  teamSize?: number;
  tags?: string[];
}

export interface UpdateProjectDto {
  title?: string;
  description?: string;
  status?: ProjectStatus;
  priority?: ProjectPriority;
  deadline?: string;
  teamSize?: number;
  progress?: number;
  tags?: string[];
}

export interface ProjectFilters {
  status?: ProjectStatus;
  priority?: ProjectPriority;
  search?: string;
  archived?: boolean;
  startDate?: string;
  endDate?: string;
  tags?: string[];
}

export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  archivedProjects: number;
  averageProgress: number;
  projectsByPriority: Record<ProjectPriority, number>;
} 