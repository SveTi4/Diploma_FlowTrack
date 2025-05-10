import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { PageHeader } from '../../molecules/PageHeader/PageHeader'
import { ProgressBarComponent } from "../../atoms/ProgressBar/ProgressBar"
import { AppDispatch, RootState } from '../../../store'
import { fetchProject, deleteProject, clearCurrentProject } from '../../../store/projects/projectsSlice'
import { ColumnsBoard } from '../../organisms/ColumnsBoard/ColumnsBoard'
import { Loader } from "../../atoms/Loader/Loader.tsx"
import { SidePanel } from '../../organisms/SidePanel/SidePanel'
import { Section, SectionTitle } from '../../molecules/Section/Section'
import { IconButton } from '../../atoms/IconButton/IconButton.tsx'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { changeColumn, moveTask } from '../../../store/tasks/tasksSlice.ts'

const MainContent = styled.div`
  flex: 1;
  padding: 32px;
  width: 100%;
  height: calc(100vh - 80px);
`

const Description = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
`

const Chart = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
`

export const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  
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

  const handleDelete = async () => {
    if (!project || !window.confirm('Вы уверены, что хотите удалить проект?')) return

    try {
      await dispatch(deleteProject(project.id)).unwrap()
      navigate('/projects')
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId, type } = result

    console.log(source)
    console.log(destination)
    console.log(draggableId)
    console.log(type)

    if (type === 'column') {
      console.log("перетаскивается колонка!")
    }
    else {
      // Если нет destination или задача перетаскивается в ту же колонку
      if (!destination || source.droppableId === destination?.droppableId) {
        if (source.index === destination?.index) {
          console.log(`Колонка не изменилась, задача осталась на позиции ${source.index}`)
          return
        } else {
          console.log(`Колонка не изменилась, но задача перемещена c позиции ${source.index} в позицию ${destination?.index}`)
          await dispatch(moveTask({
            id: Number(draggableId),
            position: Number(destination?.index),
            column_id: Number(source.droppableId)
          }))
          return
        }
      }
      console.log(`Задача ${draggableId} из колонки ${source.droppableId} перемщается в колнку ${destination?.droppableId}, с позиции ${source.index} в позицию ${destination?.index}`)
      await dispatch(changeColumn({
        taskId: Number(draggableId),
        old_column_id: Number(source.droppableId),
        new_column_id: Number(destination?.droppableId),
        position: Number(destination?.index)
      }))
    }

  }

  if (projectLoading) return <Loader size="large"  fullscreen={true} />
  if (projectError) return <div>Ошибка: {projectError}</div>
  if (!project) return <div>Проект не найден</div>

  return (
    <>
      <PageHeader 
        title={project.name}
        showBackButton>
          <>
            <IconButton onClick={() => setIsInfoOpen(true)} size={24} type={'info'}/>
            <IconButton onClick={handleDelete} size={24} type={'delete'}/>
          </>
      </PageHeader>

      <MainContent>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ColumnsBoard project_id={project.id} />
        </DragDropContext>
      </MainContent>

      <SidePanel
        isOpen={isInfoOpen}
        title="Информация о проекте"
        onClose={() => setIsInfoOpen(false)}
      >
        <Section>
          <SectionTitle>Общий прогресс</SectionTitle>
          <ProgressBarComponent progress={project?.progress ?? 0} timeLeft={''} />
        </Section>

        <Section>
          <SectionTitle>Описание</SectionTitle>
          <Description>{project.description}</Description>
        </Section>

        <Section>
          <SectionTitle>График продуктивности</SectionTitle>
          <Chart>График будет добавлен позже</Chart>
        </Section>
      </SidePanel>
    </>
  )
} 