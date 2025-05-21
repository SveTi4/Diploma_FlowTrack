import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {CreateProjectDto, Project, UpdateProjectDto, services} from "../../api/services";
import {ApiResponse} from "../../api/types/response.types.ts";
// import {ApiResponse} from "../../api/types/response.types.ts";

interface ProjectsState {
  items: Project[]
  currentProject: Project | null
  total: number
  page: number
  limit: number
  totalPages: number
  loading: boolean
  error: string | null
}

const initialState: ProjectsState = {
  items: [],
  currentProject: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  loading: false,
  error: null
}

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (params: { page: number; limit: number }) => {
    const response = await services.projects.getProjects(params)
    console.log('API Response:', response)
    return response
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

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, data }: { id: number; data: UpdateProjectDto }): Promise<ApiResponse<Project>> => {
    return await services.projects.updateProject(id.toString(), data)
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
        console.log('Action payload:', action.payload)
        state.loading = false
        state.items = action.payload.data.items || []
        state.total = action.payload.data.total || 0
        state.page = action.payload.data.page || 1
        state.limit = action.payload.data.limit || 10
        state.totalPages = action.payload.data.totalPages || 0
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
      .addCase(updateProject.fulfilled, (state, action) => {
        if (state.currentProject?.id === action.payload.data.id) {
          state.currentProject = action.payload.data
        }
        const index = state.items.findIndex(project => project.id === action.payload.data.id)
        if (index !== -1) {
          state.items[index] = action.payload.data
        }
      })
  }
})

export const { clearCurrentProject } = projectsSlice.actions
export default projectsSlice.reducer 