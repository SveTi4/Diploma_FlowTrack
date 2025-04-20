import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { fetchProjects } from '../../../store/projects/projectsSlice'
import { ProjectCard } from '../../molecules/ProjectCard/ProjectCard'
import { PageHeader } from '../../molecules/PageHeader/PageHeader'

const Container = styled.div`
  min-height: 100vh;
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 48px;
  padding: 48px 32px;
  margin: 0 auto;
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
  text-align: center;
  padding: 64px 32px;
  color: ${({ theme }) => theme.colors.light};
`

const EmptyStateText = styled.p`
  font-size: 16px;
  margin-bottom: 24px;
  opacity: 0.7;
`

export const ProjectsPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { items, loading, error } = useAppSelector((state) => state.projects)

  useEffect(() => {
    dispatch(fetchProjects({ page: 1, limit: 10 }))
  }, [dispatch])

  console.log('Projects state:', { items, loading, error })

  const handleSearch = (value: string) => {
    // TODO: Реализовать поиск
    console.log('Search:', value)
  }

  const handleCreateProject = () => {
    navigate('/projects/new')
  }

  if (loading) {
    return <LoadingText>Загрузка проектов...</LoadingText>
  }

  if (error) {
    return <ErrorText>{error}</ErrorText>
  }

  console.log('Projects to render:', items)

  return (
    <Container>
      <PageHeader
        title="Мои проекты"
        onSearch={handleSearch}
        onCreateClick={handleCreateProject}
      />
      
      {!items?.length ? (
        <EmptyState>
          <EmptyStateText>У вас пока нет проектов</EmptyStateText>
          <button onClick={() => navigate('/projects/new')}>
            Создать первый проект
          </button>
        </EmptyState>
      ) : (
        <ProjectsGrid>
          {items.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => navigate(`/projects/${project.id}`)}
            />
          ))}
        </ProjectsGrid>
      )}
    </Container>
  )
} 