import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PageHeader } from '../../molecules/PageHeader/PageHeader'
import { AppDispatch, RootState } from '../../../store'
import { fetchProject, deleteProject, clearCurrentProject, updateProject } from '../../../store/projects/projectsSlice'
import { ColumnsBoard } from '../../organisms/ColumnsBoard/ColumnsBoard'
import { Loader } from "../../atoms/Loader/Loader.tsx"
import { IconButton } from '../../atoms/IconButton/IconButton.tsx'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { changeColumn, moveTask } from '../../../store/tasks/tasksSlice.ts'
import { moveColumn } from "../../../store/columns/columnsSlice.ts"
import { usePanel } from '../../../contexts/PanelContext'
import { EditableTitle } from '../../molecules/EditableTitle/EditableTitle.tsx'
import { MainContent } from './ProjectPage.styles.ts'
import { DeleteProjectModal } from './components/DeleteProjectModal/DeleteProjectModal'
import { ProjectInfoPanel } from './components/ProjectInfoPanel/ProjectInfoPanel'

export const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { openPanel, updatePanel } = usePanel()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const { currentProject: project, loading: projectLoading, error: projectError } = useSelector((state: RootState) => state.projects)

  useEffect(() => {
    if (id) {
      const projectId = parseInt(id)
      dispatch(fetchProject(projectId))
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

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId, type } = result

    if (type === 'column') {
      if (!destination || source.index === destination?.index) return
      
      await dispatch(moveColumn({
        id: Number(draggableId),
        position: Number(destination?.index) + 1
      }))
    } else {
      if (!destination) return

      if (source.droppableId === destination.droppableId) {
        if (source.index === destination.index) return
        
        await dispatch(moveTask({
          id: Number(draggableId),
          position: Number(destination.index),
          column_id: Number(source.droppableId)
        }))
        return
      }

      await dispatch(changeColumn({
        taskId: Number(draggableId),
        old_column_id: Number(source.droppableId),
        new_column_id: Number(destination.droppableId),
        position: Number(destination.index)
      }))
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
      content: <ProjectInfoPanel project={project} dispatch={dispatch} updatePanel={updatePanel} />
    });
  };

  if (projectLoading) return <Loader size="large" fullscreen={true} />
  if (projectError) return <div>Ошибка: {projectError}</div>
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <ColumnsBoard project_id={project.id} />
        </DragDropContext>
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