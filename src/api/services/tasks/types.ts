export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  columnId: string;
  assigneeId?: string;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
  order: number;
  tags?: string[];
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  projectId: string;
  columnId: string;
  priority?: TaskPriority;
  assigneeId?: string;
  deadline?: string;
  tags?: string[];
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  columnId?: string;
  assigneeId?: string;
  deadline?: string;
  order?: number;
  tags?: string[];
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  projectId?: string;
  columnId?: string;
  assigneeId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  tags?: string[];
}

export interface MoveTaskDto {
  columnId: string;
  order: number;
} 