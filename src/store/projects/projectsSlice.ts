import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {CreateProjectDto, Project , services} from "../../api/services";
import {ApiListResponse, ApiResponse} from "../../api/types/response.types.ts";

interface ProjectsState {
  items: Project[]
  currentProject: Project | null
  total: number
  page: number
  limit: number
  loading: boolean
  error: string | null
}

const initialState: ProjectsState = {
  items: [],
  currentProject: null,
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null
}

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (params?: { page?: number; limit?: number }): Promise<ApiListResponse<Project>> => {
    return await services.projects.getProjects(params)
  }
)

export const fetchProject = createAsyncThunk(
  'projects/fetchProject',
  async (projectId: number): Promise<ApiResponse<Project>> => {
    return await services.projects.getProject(projectId)
  }
)

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (data: CreateProjectDto): Promise<ApiResponse<Project>> => {
    return await services.projects.createProject(data)
  }
)

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId: number) => {
    await services.projects.deleteProject(projectId)
    return projectId
  }
)

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearCurrentProject: (state) => {
      state.currentProject = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data.items
        state.total = action.payload.data.total
        state.page = action.payload.data.page
        state.limit = action.payload.data.limit
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Произошла ошибка при загрузке проектов'
      })
      .addCase(fetchProject.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.loading = false
        state.currentProject = action.payload.data
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Произошла ошибка при загрузке проекта'
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.push(action.payload.data)
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter(project => project.id !== action.payload)
        if (state.currentProject?.id === action.payload) {
          state.currentProject = null
        }
      })
  }
})

export const { clearCurrentProject } = projectsSlice.actions
export default projectsSlice.reducer 