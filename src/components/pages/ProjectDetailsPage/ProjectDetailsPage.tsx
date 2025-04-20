import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../molecules/PageHeader/PageHeader'
import { TaskColumn } from '../../molecules/TaskColumn/TaskColumn'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { fetchColumns, createColumn } from '../../../store/columns/columnsSlice'

const Container = styled.div`
  min-height: 100vh;
  //background: #1C1C1E;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`

const TopSection = styled.div`
  height: 40vh;
  min-height: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  padding: 48px 32px 24px 32px;
`

const BottomSection = styled.div`
  height: 45vh;
  padding: 24px 32px 48px 32px;
  display: flex;
  flex-direction: column;
  //overflow-x: auto;
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
  background: ${({ theme }) => theme.colors.background};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
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

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  background: #27282A;
  border: #323336 1px solid;
`

const CardTitle = styled.h3`
  color: white;
  font-size: 16px;
  margin-bottom: 16px;
`

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.7;
  font-size: 12px;
`

const ProgressBar = styled.div<{ progress: number }>`
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ progress }) => progress}%;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
    transition: width 0.3s ease;
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

// Временные данные для примера
const mockProjectDetails = {
  1: {
    title: 'Проект 1',
    description: 'Подробное описание проекта и его целей',
    progress: 75,
    timeLeft: 'Осталось: 5 дней 4 часа'
  },
  2: {
    title: 'Проект номер 2',
    description: 'Подробное описание проекта номер 2. Проект успешно завершен.',
    progress: 100,
    timeLeft: 'Завершен'
  },
  3: {
    title: 'Проект номер 3',
    description: 'Подробное описание проекта номер 3. Проект находится на начальной стадии реализации.',
    progress: 35,
    timeLeft: 'Осталось: 2 недели'
  },
  4: {
    title: 'Проект номер 4',
    description: 'Подробное описание проекта номер 3. Проект находится на начальной стадии реализации.',
    progress: 35,
    timeLeft: 'Осталось: 2 недели'
  },
  5: {
    title: 'Проект номер 5',
    description: 'Подробное описание проекта номер 3. Проект находится на начальной стадии реализации.',
    progress: 35,
    timeLeft: 'Осталось: 2 недели'
  },
  6: {
    title: 'Проект номер 3',
    description: 'Подробное описание проекта номер 3. Проект находится на начальной стадии реализации.',
    progress: 35,
    timeLeft: 'Осталось: 2 недели'
  }
}

interface Task {
  id: string
  title: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
}

export const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { items: columns, loading, error } = useAppSelector((state) => state.columns)
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false)
  
  useEffect(() => {
    if (id) {
      dispatch(fetchColumns({ projectId: parseInt(id, 10) }))
    }
  }, [dispatch, id])

  // @ts-ignore - игнорируем для демо
  const project = mockProjectDetails[id]

  const handleAddColumn = () => {
    if (id) {
      const columnName = prompt('Введите название колонки:')
      if (columnName) {
        dispatch(createColumn({ name: columnName, projectId: parseInt(id, 10) }))
      }
    }
  }

  const renderContent = () => {
    if (loading) {
      return <LoadingText>Загрузка колонок...</LoadingText>
    }

    if (error) {
      return <ErrorText>{error}</ErrorText>
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

  if (!project) {
    return <div>Проект не найден</div>
  }

  const headerButtons = (
    <>
      <InfoButton onClick={() => setIsInfoPanelOpen(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </InfoButton>
    </>
  )

  return (
    <Container>
      <PageHeader 
        title={project.title}
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

        <Card>
          <CardTitle>Общий прогресс:</CardTitle>
          <ProgressInfo>
            <div>Прогресс: {project.progress}%</div>
            <div>{project.timeLeft}</div>
          </ProgressInfo>
          <ProgressBar progress={project.progress} />
        </Card>

        <Card>
          <CardTitle>График продуктивности:</CardTitle>
          <Chart>График будет добавлен позже</Chart>
        </Card>

        <Card>
          <CardTitle>Описание проекта:</CardTitle>
          <Description>{project.description}</Description>
        </Card>
      </SidePanel>
    </Container>
  )
} 