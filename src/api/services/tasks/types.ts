export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  name: string;
  description?: string;
  status: boolean;
  archived: boolean;
  column_id: number;
  deadline: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskDto {
  name: string;
  description: string;
  column_id: number;
  deadline: string | null;
  status: boolean;
}

export interface UpdateTaskDto {
  name?: string;
  description?: string;
  status?: boolean;
  column_id: number;
  deadline?: string | null;
}

export interface TaskFilters {
  status?: boolean;
  column_id?: string;
  search?: string;
  deadline?: string | null;
  created_at?: string;
  updated_at?: string;
}