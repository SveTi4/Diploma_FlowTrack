import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { PageHeader } from '../../molecules/PageHeader/PageHeader'
import { Card } from '../../atoms/Card/Card'
import { ProgressBarComponent } from "../../atoms/ProgressBar/ProgressBar"
import { CloseIcon, InfoIcon, TrashIcon } from "../../atoms/Icon/icons.tsx"
import { AppDispatch, RootState } from '../../../store'
import { fetchProject, deleteProject, clearCurrentProject } from '../../../store/projects/projectsSlice'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`

const MainContent = styled.div`
  flex: 1;
  padding: 24px 32px;
`

const SidePanel = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-640px')};
  width: 640px;
  height: 100vh;
  background: #121316;
  padding: 0;
  transition: right 0.3s ease;
  overflow-y: auto;
  z-index: 1000;
`

const SidePanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 32px;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const SidePanelTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

const SidePanelContent = styled.div`
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const InfoCard = styled(Card)`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: none;
  
  h3 {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 20px;
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
  }
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin: 16px 0;
`

const Chart = styled.div`
  width: 100%;
  height: 320px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  margin-bottom: 48px ;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const LoadingText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  padding: 32px;
`

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.8;
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
  
  const { currentProject: project, loading, error } = useSelector((state: RootState) => state.projects)

  useEffect(() => {
    if (id) {
      dispatch(fetchProject(parseInt(id)))
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

  if (loading) return <LoadingText>Загрузка...</LoadingText>
  if (error) return <LoadingText>Ошибка: {error}</LoadingText>
  if (!project) return <LoadingText>Проект не найден</LoadingText>

  return (
    <Container>
      <PageHeader 
        title={project.name}
        showBackButton>
          <>
            <ActionButton onClick={() => setIsInfoOpen(true)}>
              <InfoIcon color={'white'} size={24} />
            </ActionButton>
            <ActionButton onClick={handleDelete}>
              <TrashIcon color={'white'} size={24} />
            </ActionButton>
          </>
      </PageHeader>

      <MainContent>
        {/* Здесь будут колонки с задачами */}
      </MainContent>

      <SidePanel isOpen={isInfoOpen}>
        <SidePanelHeader>
          <SidePanelTitle>Информация о проекте</SidePanelTitle>
          <CloseButton onClick={() => setIsInfoOpen(false)}>
            <CloseIcon color={'white'} size={24} />
          </CloseButton>
        </SidePanelHeader>

        <SidePanelContent>
          <InfoCard title="Общий прогресс">
            <ProgressBarComponent progress={project?.progress ?? 0} timeLeft={''} />
          </InfoCard>

          <InfoCard title="Описание">
            <Description>{project.description}</Description>
          </InfoCard>

          <InfoCard title="График продуктивности">
            <Chart>График будет добавлен позже</Chart>
          </InfoCard>
        </SidePanelContent>
      </SidePanel>
    </Container>
  )
} 