// import { ApiResponse } from '../../types/response.types'

export type ProjectStatus = 'active' | 'archived' | 'completed' | 'draft';
export type ProjectPriority = 'low' | 'medium' | 'high';

export interface Project {
  id: number;
  name: string;
  description: string;
  deadline: string | null;
  progress?: number;
  status?: ProjectStatus;
  priority?: ProjectPriority;
  created_at: string;
  updated_at: string;
  tags?: string[];
  archived: boolean;
}

export interface CreateProjectDto {
  name: string;
  description: string;
  deadline?: string | null;
  priority?: ProjectPriority;
  teamSize?: number;
  tags?: string[];
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  priority?: ProjectPriority;
  deadline?: string | null;
  teamSize?: number;
  progress?: number;
  tags?: string[];
}

export interface ProjectFilters {
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