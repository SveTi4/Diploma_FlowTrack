import styled from 'styled-components'
import { useState, useEffect, useMemo } from 'react'
import { PageHeader } from '../../molecules/PageHeader/PageHeader'
import { ProjectCard } from './components/ProjectCard'
import { CreateProjectModal } from './components/CreateProjectModal'
import { PlusIcon, RefreshIcon } from '../../atoms/Icon/icons'
import { Button } from '../../atoms/Button/Button'
import { EmptyState } from '../../atoms/EmptyState/EmptyState'
import { projectsApi } from '../../../api/projects'
import { Loader } from '../../atoms/Loader/Loader'
import { SearchInput } from '../../atoms/SearchInput/SearchInput'

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

interface Project {
  id: number
  name: string
  description: string
  deadline: string | null
}

export const ProjectsPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchProjects = async (showLoader = true) => {
    try {
      if (showLoader) {
        setIsLoading(true)
      } else {
        setIsRefreshing(true)
      }
      
      const response = await projectsApi.getProjects({ page: 1, limit: 10 })
      console.log('Projects response:', response)
      const projectsList = Array.isArray(response) ? response : (Array.isArray(response.data) ? response.data : [])
      console.log('Parsed projects:', projectsList)
      setProjects(projectsList)
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError(err instanceof Error ? err.message : 'Произошла ошибка')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const handleRefresh = () => {
    fetchProjects(false)
  }

  const handleCreateProject = async (project: { name: string; description: string; deadline: string | null }) => {
    try {
      const response = await projectsApi.createProject(project)
      console.log('Create project response:', response)
      const newProject = response.data || response
      setProjects(prevProjects => [...prevProjects, newProject])
      setIsCreateModalOpen(false)
    } catch (err) {
      console.error('Error creating project:', err)
      setError(err instanceof Error ? err.message : 'Произошла ошибка при создании проекта')
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
    fetchProjects()
  }, [])

  if (isLoading) {
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