import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { PageHeader } from '../../molecules/PageHeader/PageHeader'
import { TaskColumn } from '../../molecules/TaskColumn/TaskColumn'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { fetchColumns, createColumn } from '../../../store/columns/columnsSlice'
import { deleteProject, fetchProjects } from '../../../store/projects/projectsSlice'
import { ProgressBarComponent } from '../../atoms/ProgressBar/ProgressBar'
import { Card as InfoCard } from '../../atoms/Card/Card'
import { getTimeLeft } from '../../../utils/time'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`

const InfoButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.15);
  }

  svg {
    width: 20px;
    height: 20px;
    stroke: ${({ theme }) => theme.colors.light};
  }
`

const SidePanel = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-400px')};
  width: 400px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.sidebar_bg};
  padding: 24px;
  transition: right 0.3s ease;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: 1000;
`

const SidePanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const SidePanelTitle = styled.h2`
  color: ${({ theme }) => theme.colors.light};
  font-size: 18px;
  font-weight: 500;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 20px;
    height: 20px;
    stroke: ${({ theme }) => theme.colors.light};
  }
`

const Description = styled.p`
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
`

const Chart = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.3);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`

const MainContent = styled.div`
  flex: 1;
  padding: 24px 32px 48px 32px;
  display: flex;
  flex-direction: column;
`

const ColumnsContainer = styled.div`
  display: flex;
  gap: 24px;
  height: 100%;
  min-width: fit-content;
  overflow-x: auto;
`

const ColumnsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const ColumnsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.light};
  font-size: 18px;
  font-weight: 500;
`

const AddButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 20px;
    height: 20px;
    stroke: ${({ theme }) => theme.colors.light};
  }
`

const LoadingText = styled.div`
  color: ${({ theme }) => theme.colors.light};
  text-align: center;
  padding: 32px;
`

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  text-align: center;
  padding: 32px;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 48px;
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.6;
  text-align: center;
`

const EmptyStateIcon = styled.div`
  margin-bottom: 24px;
  svg {
    width: 48px;
    height: 48px;
    stroke: currentColor;
  }
`

const EmptyStateTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
`

const EmptyStateText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  max-width: 400px;
  margin-bottom: 24px;
`

const EmptyStateButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    margin-right: 8px;
    vertical-align: middle;
    margin-top: -2px;
  }
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.danger};
  }

  svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
  }
`

export const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { items: columns, loading: columnsLoading, error: columnsError } = useAppSelector((state) => state.columns)
  const { items: projects, loading: projectsLoading } = useAppSelector((state) => state.projects)
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false)
  
  useEffect(() => {
    if (id) {
      dispatch(fetchColumns({ projectId: parseInt(id, 10) }))
      dispatch(fetchProjects())
    }
  }, [dispatch, id])

  const project = projects.find(p => p.id === parseInt(id!, 10))
  const progress = 50 // Статичный прогресс

  if (projectsLoading) {
    return <LoadingText>Загрузка проекта...</LoadingText>
  }

  if (!project) {
    return <div>Проект не найден</div>
  }

  const handleAddColumn = () => {
    if (id) {
      const column_name = prompt('Введите название колонки:')
      if (column_name) {
        dispatch(createColumn({ name: column_name, projectId: parseInt(id, 10) }))
      }
    }
  }

  const handleDeleteProject = async () => {
    if (window.confirm('Вы уверены, что хотите удалить этот проект?')) {
      try {
        await dispatch(deleteProject(parseInt(id!, 10))).unwrap()
        navigate('/projects')
      } catch (error) {
        console.error('Ошибка при удалении проекта:', error)
        alert('Не удалось удалить проект')
      }
    }
  }

  const renderContent = () => {
    if (columnsLoading) {
      return <LoadingText>Загрузка колонок...</LoadingText>
    }

    if (columnsError) {
      return <ErrorText>{columnsError}</ErrorText>
    }

    if (columns.length === 0) {
      return (
        <EmptyState>
          <EmptyStateIcon>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6C4 4.89543 4.89543 4 6 4H8C9.10457 4 10 4.89543 10 6V8C10 9.10457 9.10457 10 8 10H6C4.89543 10 4 9.10457 4 8V6Z" strokeWidth="2" strokeLinecap="round"/>
              <path d="M14 6C14 4.89543 14.8954 4 16 4H18C19.1046 4 20 4.89543 20 6V8C20 9.10457 19.1046 10 18 10H16C14.8954 10 14 9.10457 14 8V6Z" strokeWidth="2" strokeLinecap="round"/>
              <path d="M4 16C4 14.8954 4.89543 14 6 14H8C9.10457 14 10 14.8954 10 16V18C10 19.1046 9.10457 20 8 20H6C4.89543 20 4 19.1046 4 18V16Z" strokeWidth="2" strokeLinecap="round"/>
              <path d="M14 16C14 14.8954 14.8954 14 16 14H18C19.1046 14 20 14.8954 20 16V18C20 19.1046 19.1046 20 18 20H16C14.8954 20 14 19.1046 14 18V16Z" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </EmptyStateIcon>
          <EmptyStateTitle>Колонки отсутствуют</EmptyStateTitle>
          <EmptyStateText>
            Создайте первую колонку для организации задач в вашем проекте. 
            Например: "К выполнению", "В работе", "Завершено".
          </EmptyStateText>
          <EmptyStateButton onClick={handleAddColumn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Создать колонку
          </EmptyStateButton>
        </EmptyState>
      )
    }

    return (
      <ColumnsContainer>
        {columns.map((column) => (
          <TaskColumn key={column.Id} column={column} />
        ))}
      </ColumnsContainer>
    )
  }

  const headerButtons = (
    <>
      <InfoButton onClick={() => setIsInfoPanelOpen(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </InfoButton>
      <DeleteButton onClick={handleDeleteProject}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M3 7H21M17 7V4C17 3.44772 16.5523 3 16 3H8C7.44772 3 7 3.44772 7 4V7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </DeleteButton>
    </>
  )

  return (
    <Container>
      <PageHeader 
        title={project.name}
        showBackButton
        rightContent={headerButtons}
      />
      
      <MainContent>
        {columns.length > 0 && (
          <ColumnsHeader>
            <ColumnsTitle>Колонки</ColumnsTitle>
            <AddButton onClick={handleAddColumn}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </AddButton>
          </ColumnsHeader>
        )}
        {renderContent()}
      </MainContent>

      <SidePanel isOpen={isInfoPanelOpen}>
        <SidePanelHeader>
          <SidePanelTitle>Информация о проекте</SidePanelTitle>
          <CloseButton onClick={() => setIsInfoPanelOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CloseButton>
        </SidePanelHeader>

        <InfoCard title="Общий прогресс">
          <ProgressBarComponent progress={progress} timeLeft={getTimeLeft(project.deadline)} />
        </InfoCard>

        <InfoCard title="График продуктивности">
          <Chart>График будет добавлен позже</Chart>
        </InfoCard>

        <InfoCard title="Описание проекта">
          <Description>{project.description}</Description>
        </InfoCard>
      </SidePanel>
    </Container>
  )
} 