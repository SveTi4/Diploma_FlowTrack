import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Project, ProjectsResponse } from '../../types/project'
import { projectsApi } from '../../api/projects'

interface ProjectsState {
  items: Project[]
  total: number
  page: number
  limit: number
  loading: boolean
  error: string | null
}

const initialState: ProjectsState = {
  items: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null
}

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (params?: { page?: number; limit?: number }): Promise<ProjectsResponse> => {
    return await projectsApi.getProjects(params)
  }
)

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (data: { name: string; description?: string }): Promise<Project> => {
    return await projectsApi.createProject(data)
  }
)

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId: number) => {
    await projectsApi.deleteProject(projectId)
    return projectId
  }
)

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
        state.total = action.payload.total
        state.page = action.payload.page
        state.limit = action.payload.limit
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Произошла ошибка при загрузке проектов'
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter(project => project.Id !== action.payload)
      })
  }
})

export default projectsSlice.reducer 