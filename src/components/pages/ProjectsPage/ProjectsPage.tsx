import styled from 'styled-components'
import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { PageHeader } from '../../molecules/PageHeader/PageHeader'
import { ProjectCard } from './components/ProjectCard'
import { CreateProjectModal } from './components/CreateProjectModal'
import { PlusIcon, RefreshIcon } from '../../atoms/Icon/icons'
import { Button } from '../../atoms/Button/Button'
import { EmptyState } from '../../atoms/EmptyState/EmptyState'
import { Loader } from '../../atoms/Loader/Loader'
import { SearchInput } from '../../atoms/SearchInput/SearchInput'
import { fetchProjects, createProject } from '../../../store/projects/projectsSlice'

const Container = styled.div`
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  padding: 32px;
  flex: 1;
  overflow: auto;
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 48px;
  margin-top: 24px;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`

const HeaderContent = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

export const ProjectsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const page = 1
  const limit = 10

  const { items: projects, loading, error } = useSelector((state: RootState) => state.projects)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await dispatch(fetchProjects({ page, limit }))
    setIsRefreshing(false)
  }

  const handleCreateProject = async (project: { name: string; description: string; deadline: string | null }) => {
    try {
      await dispatch(createProject(project)).unwrap()
      setIsCreateModalOpen(false)
    } catch (err) {
      console.error('Error creating project:', err)
    }
  }

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projects

    const query = searchQuery.toLowerCase()
    return projects.filter(project => 
      project.name.toLowerCase().includes(query) ||
      project.description?.toLowerCase().includes(query)
    )
  }, [projects, searchQuery])

  useEffect(() => {
    dispatch(fetchProjects({ page, limit }))
  }, [dispatch, page])

  if (loading && !isRefreshing) {
    return (
      <Container>
        <PageHeader title="Мои проекты" />
        <Content>
          <Loader size="large" />
        </Content>
      </Container>
    )
  }

  if (error) {
    return <div>Ошибка: {error}</div>
  }

  return (
    <Container>
      <PageHeader title="Мои проекты">
        <HeaderContent>
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Поиск по названию или описанию..."
          />
          <ButtonGroup>
            <Button variant="secondary" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshIcon size={16} />
              {isRefreshing ? 'Обновление...' : 'Обновить'}
            </Button>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <PlusIcon size={16} />
              Создать проект
            </Button>
          </ButtonGroup>
        </HeaderContent>
      </PageHeader>

      <Content>
        {filteredProjects.length === 0 ? (
          <EmptyState
            icon={<PlusIcon size={48} />}
            title={searchQuery ? "Проекты не найдены" : "У вас пока нет проектов"}
            description={searchQuery 
              ? "Попробуйте изменить параметры поиска"
              : "Создайте свой первый проект, чтобы начать работу"
            }
            buttonText="Создать проект"
            onButtonClick={() => setIsCreateModalOpen(true)}
          />
        ) : (
          <ProjectsGrid>
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ProjectsGrid>
        )}
      </Content>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </Container>
  )
}