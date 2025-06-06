import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PageHeader, EditableTitle } from '../../molecules'
import { AppDispatch, RootState } from '../../../store'
import { fetchProject, deleteProject, clearCurrentProject, updateProject } from '../../../store/projects/projectsSlice'
import { fetchProjectProgress, fetchProjectBurndown } from '../../../store/projects/projectProgressSlice'
import { IconButton, Loader } from "../../atoms"
import { usePanel } from '../../../contexts/PanelContext'
import { MainContent } from './ProjectPage.styles.ts'
import { DeleteProjectModal } from './components/DeleteProjectModal/DeleteProjectModal'
import { ProjectInfoPanel } from './components/ProjectInfoPanel/ProjectInfoPanel'
import { ProjectBoard } from './components/ProjectBoard/ProjectBoard'

export const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { openPanel, updatePanel } = usePanel()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const { currentProject: project, loading: projectLoading, error: projectError } = useSelector((state: RootState) => state.projects)
  const { progress, burndownData, loading: progressLoading, error: progressError } = useSelector((state: RootState) => state.projectProgress)

  useEffect(() => {
    if (id) {
      const projectId = parseInt(id)
      dispatch(fetchProject(projectId))
      dispatch(fetchProjectProgress(projectId))
      dispatch(fetchProjectBurndown(projectId))
    }
    
    return () => {
      dispatch(clearCurrentProject())
    }
  }, [id, dispatch])

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
  }

  const handleArchive = async () => {
    if (!project) return

    try {
      await dispatch(updateProject({ 
        id: project.id, 
        data: { archived: true } 
      })).unwrap()
      navigate('/projects')
    } catch (error) {
      console.error('Error archiving project:', error)
    }
  }

  const handleDelete = async () => {
    if (!project) return

    try {
      await dispatch(deleteProject(project.id)).unwrap()
      navigate('/projects')
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleOpenProjectInfo = () => {
    if (!project) return

    openPanel({
      type: 'project',
      title: (
        <EditableTitle
          value={project.name}
          onSave={async (newName) => {
            await dispatch(updateProject({ 
              id: project.id, 
              data: { name: newName } 
            })).unwrap();
            
            updatePanel({
              title: (
                <EditableTitle
                  value={newName}
                  onSave={(newName) => dispatch(updateProject({ 
                    id: project.id, 
                    data: { name: newName } 
                  }))}
                />
              )
            });
          }}
        />
      ),
      content: (
        <ProjectInfoPanel 
          project={project} 
          dispatch={dispatch} 
          updatePanel={updatePanel}
          progress={progress}
          burndownData={burndownData}
          loading={progressLoading}
          error={progressError}
        />
      )
    });
  };

  if (projectLoading || progressLoading) return <Loader size="large" fullscreen={true} />
  if (projectError) return <div>Ошибка: {projectError}</div>
  if (progressError) return <div>Ошибка прогресса: {progressError}</div>
  if (!project) return <div>Проект не найден</div>

  return (
    <>
      <PageHeader 
        title={project.name}
        showBackButton>
          <>
            <IconButton onClick={handleOpenProjectInfo} size={24} type={'info'}/>
            <IconButton onClick={handleDeleteClick} size={24} type={'delete'}/>
          </>
      </PageHeader>

      <MainContent>
        <ProjectBoard projectId={project.id} dispatch={dispatch} />
      </MainContent>

      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onArchive={handleArchive}
        onDelete={handleDelete}
        projectName={project.name}
      />
    </>
  )
} 