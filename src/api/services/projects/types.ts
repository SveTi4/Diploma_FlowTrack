// import { ApiResponse } from '../../types/response.types'

export interface Project {
  id: number;
  name: string;
  description: string;
  deadline: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  archived: boolean;
}

export interface CreateProjectDto {
  name: string;
  description: string;
  deadline?: string | null;
  teamSize?: number;
  tags?: string[];
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  deadline?: string | null;
  teamSize?: number;
  progress?: number;
  tags?: string[];
  archived?: boolean;
}

export interface ProjectFilters {
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
}

export interface ProductivityDataPoint {
  day: string;
  count: number;
}

export type ProductivityData = ProductivityDataPoint[];

export interface ProjectMetrics {
  total_tasks: number;
  done_tasks: number;
  days_elapsed: number;
  days_left: number | null;
  rem_tasks: number;
  v_real: number;
  v_req: number | null;
  perception_done: number;
  projected_finish_date: string | null;
  status: 'green' | 'yellow' | 'red' | null;
} 