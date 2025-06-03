import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { PageHeader } from '../../molecules'
import { ProjectCard } from './components/ProjectCard/ProjectCard.tsx'
import { CreateProjectModal } from './components/CreateProjectModal/CreateProjectModal.tsx'
import { PlusIcon, RefreshIcon, Button, Loader, SearchInput } from '../../atoms'
import { EmptyState } from '../../molecules'
import { fetchProjects, createProject } from '../../../store/projects/projectsSlice'
import { Project } from '../../../api/services'
import { Content, ProjectsGrid, ButtonGroup, HeaderContent } from './ProjectsPage.styles'

interface ProjectsHeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  onRefresh: () => void
  onCreateClick: () => void
  isRefreshing: boolean
}

const ProjectsHeader = React.memo(({ 
  searchQuery, 
  onSearchChange, 
  onRefresh, 
  onCreateClick,
  isRefreshing 
}: ProjectsHeaderProps) => {
  return (
    <PageHeader title="Мои проекты">
      <HeaderContent>
        <SearchInput 
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Поиск по названию или описанию..."
        />
        <ButtonGroup>
          <Button variant="ghost" onClick={onRefresh} disabled={isRefreshing}>
            <RefreshIcon size={16} />
            {isRefreshing ? 'Обновление...' : 'Обновить'}
          </Button>
          <Button onClick={onCreateClick}>
            <PlusIcon size={16} />
            Создать проект
          </Button>
        </ButtonGroup>
      </HeaderContent>
    </PageHeader>
  )
})

interface ProjectsListProps {
  projects: Project[]
  searchQuery: string
  onCreateClick: () => void
}

const ProjectsList = React.memo(({ projects, searchQuery, onCreateClick }: ProjectsListProps) => {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon={<PlusIcon size={48} />}
        title={searchQuery ? "Проекты не найдены" : "У вас пока нет проектов"}
        description={searchQuery 
          ? "Попробуйте изменить параметры поиска"
          : "Создайте свой первый проект, чтобы начать работу"
        }
        buttonText="Создать проект"
        onButtonClick={onCreateClick}
      />
    )
  }

  return (
    <ProjectsGrid>
      {projects.map(project => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          searchQuery={searchQuery}
        />
      ))}
    </ProjectsGrid>
  )
})

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
    await dispatch(fetchProjects({ 
      page, 
      limit,
      search: searchQuery,
      archived: false
    }))
    setIsRefreshing(false)
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    dispatch(fetchProjects({ 
      page, 
      limit,
      search: value,
      archived: false
    }))
  }

  const handleCreateProject = async (project: { name: string; description: string; deadline: string | null }) => {
    try {
      await dispatch(createProject(project)).unwrap()
      setIsCreateModalOpen(false)
      handleRefresh()
    } catch (err) {
      console.error('Error creating project:', err)
    }
  }

  useEffect(() => {
    dispatch(fetchProjects({ 
      page, 
      limit,
      search: searchQuery,
      archived: false
    }))
  }, [dispatch, page, limit, searchQuery])  

  if (loading && !isRefreshing) {
    return (
      <>
        <ProjectsHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onRefresh={handleRefresh}
          onCreateClick={() => setIsCreateModalOpen(true)}
          isRefreshing={isRefreshing}
        />
        <Content>
          <Loader size="large" />
        </Content>
      </>
    )
  }

  if (error) {
    return <div>Ошибка: {error}</div>
  }

  return (
    <>
      <ProjectsHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onRefresh={handleRefresh}
        onCreateClick={() => setIsCreateModalOpen(true)}
        isRefreshing={isRefreshing}
      />

      <Content>
        <ProjectsList
          projects={projects}
          searchQuery={searchQuery}
          onCreateClick={() => setIsCreateModalOpen(true)}
        />
      </Content>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </>
  )
}