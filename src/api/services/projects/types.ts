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
  archived?: boolean;
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

export interface ProjectMetrics {
  days_elapsed: number;
  days_left: number | null;
  total_tasks: number;
  done_tasks: number;
  rem_tasks: number;
  v_real: number;
  v_req: number | null;
  perception_done: number;
  projected_finish_date: string | null;
  status: 'green' | 'yellow' | 'red';
} 