import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { PageHeader } from '../../molecules/PageHeader/PageHeader'
import { ProgressBarComponent } from "../../atoms/ProgressBar/ProgressBar"
import { InfoIcon } from "../../atoms/Icon/icons"
import { AppDispatch, RootState } from '../../../store'
import { fetchProject, deleteProject, clearCurrentProject } from '../../../store/projects/projectsSlice'
import { ColumnsBoard } from '../../organisms/ColumnsBoard/ColumnsBoard'
import { Loader } from "../../atoms/Loader/Loader.tsx"
import { SidePanel } from '../../molecules/SidePanel/SidePanel'
import { Section, SectionTitle } from '../../molecules/Section/Section'
import { DeleteButton } from '../../atoms/DeleteButton/DeleteButton'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`

const MainContent = styled.div`
  flex: 1;
  padding: 24px;
  width: 100%;
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

const HeaderButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.text};
  }

  svg {
    width: 24px;
    height: 24px;
    stroke: currentColor;
  }
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

  if (projectLoading) return <Loader size="large"  fullscreen={true} />
  if (projectError) return <div>Ошибка: {projectError}</div>
  if (!project) return <div>Проект не найден</div>

  return (
    <Container>
      <PageHeader 
        title={project.name}
        showBackButton>
          <>
            <HeaderButton onClick={() => setIsInfoOpen(true)}>
              <InfoIcon size={24} />
            </HeaderButton>
            <DeleteButton onClick={handleDelete} size={24} />
          </>
      </PageHeader>

      <MainContent>
        <ColumnsBoard project_id={project.id} />
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
    </Container>
  )
} 