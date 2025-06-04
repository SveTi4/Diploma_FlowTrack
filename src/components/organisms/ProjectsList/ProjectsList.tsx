import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { AppDispatch, RootState } from '../../../store'
import { PageHeader } from '../../molecules'
import { ProjectCard } from './components/ProjectCard/ProjectCard'
import { ArchivedProjectCard } from './components/ArchivedProjectCard/ArchivedProjectCard'
import { CreateProjectModal } from './components/CreateProjectModal/CreateProjectModal'
import { PlusIcon, RefreshIcon, Button, Loader, SearchInput } from '../../atoms'
import { EmptyState } from '../../molecules'
import { fetchProjects, createProject, updateProject, deleteProject } from '../../../store/projects/projectsSlice'
import { Project } from '../../../api/services'
import { Content, ProjectsGrid, ButtonGroup, HeaderContent } from './ProjectsList.styles'

interface ProjectsHeaderProps {
  title: string
  searchQuery: string
  onSearchChange: (value: string) => void
  onRefresh: () => void
  onCreateClick: () => void
  isRefreshing: boolean
  showCreateButton?: boolean
}

const ProjectsHeader = React.memo(({ 
  title,
  searchQuery, 
  onSearchChange, 
  onRefresh, 
  onCreateClick,
  isRefreshing,
  showCreateButton = true
}: ProjectsHeaderProps) => {
  return (
    <PageHeader title={title}>
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
          {showCreateButton && (
            <Button onClick={onCreateClick}>
              <PlusIcon size={16} />
              Создать проект
            </Button>
          )}
        </ButtonGroup>
      </HeaderContent>
    </PageHeader>
  )
})

interface ProjectsListProps {
  projects: Project[]
  searchQuery: string
  onCreateClick: () => void
  showCreateButton?: boolean
  isArchive?: boolean
  onRestore?: (project: Project) => void
  onDelete?: (project: Project) => void
}

const ProjectsListContent = React.memo(({ 
  projects, 
  searchQuery, 
  onCreateClick,
  showCreateButton = true,
  isArchive = false,
  onRestore,
  onDelete
}: ProjectsListProps) => {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon={<PlusIcon size={48} />}
        title={searchQuery 
          ? "Проекты не найдены" 
          : isArchive 
            ? "В архиве нет проектов"
            : "У вас пока нет проектов"
        }
        description={searchQuery 
          ? "Попробуйте изменить параметры поиска"
          : isArchive
            ? "Архивированные проекты появятся здесь"
            : "Создайте свой первый проект, чтобы начать работу"
        }
        buttonText={showCreateButton ? "Создать проект" : undefined}
        onButtonClick={showCreateButton ? onCreateClick : undefined}
      />
    )
  }

  return (
    <ProjectsGrid>
      {projects.map(project => isArchive ? (
        <ArchivedProjectCard 
          key={project.id} 
          project={project} 
          searchQuery={searchQuery}
          onRestore={onRestore!}
          onDelete={onDelete!}
        />
      ) : (
        <ProjectCard 
          key={project.id} 
          project={project} 
          searchQuery={searchQuery}
        />
      ))}
    </ProjectsGrid>
  )
})

export const ProjectsList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const page = 1
  const limit = 10
  const isArchive = location.pathname === '/archive'

  const { items: projects, loading, error } = useSelector((state: RootState) => state.projects)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await dispatch(fetchProjects({ 
      page, 
      limit,
      search: searchQuery,
      archived: isArchive
    }))
    setIsRefreshing(false)
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    dispatch(fetchProjects({ 
      page, 
      limit,
      search: value,
      archived: isArchive
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

  const handleArchive = async (project: Project) => {
    try {
      await dispatch(updateProject({ 
        id: project.id, 
        data: { archived: true } 
      })).unwrap()
      handleRefresh()
    } catch (err) {
      console.error('Error archiving project:', err)
    }
  }

  const handleRestore = async (project: Project) => {
    try {
      await dispatch(updateProject({ 
        id: project.id, 
        data: { archived: false } 
      })).unwrap()
      handleRefresh()
    } catch (err) {
      console.error('Error restoring project:', err)
    }
  }

  const handleDelete = async (project: Project) => {
    try {
      await dispatch(deleteProject(project.id)).unwrap()
      handleRefresh()
    } catch (err) {
      console.error('Error deleting project:', err)
    }
  }

  useEffect(() => {
    dispatch(fetchProjects({ 
      page, 
      limit,
      search: searchQuery,
      archived: isArchive
    }))
  }, [dispatch, page, limit, searchQuery, isArchive])  

  if (loading && !isRefreshing) {
    return (
      <>
        <ProjectsHeader
          title={isArchive ? "Архив проектов" : "Мои проекты"}
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onRefresh={handleRefresh}
          onCreateClick={() => setIsCreateModalOpen(true)}
          isRefreshing={isRefreshing}
          showCreateButton={!isArchive}
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
        title={isArchive ? "Архив проектов" : "Мои проекты"}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onRefresh={handleRefresh}
        onCreateClick={() => setIsCreateModalOpen(true)}
        isRefreshing={isRefreshing}
        showCreateButton={!isArchive}
      />

      <Content>
        <ProjectsListContent
          projects={projects}
          searchQuery={searchQuery}
          onCreateClick={() => setIsCreateModalOpen(true)}
          showCreateButton={!isArchive}
          isArchive={isArchive}
          onRestore={isArchive ? handleRestore : handleArchive}
          onDelete={handleDelete}
        />
      </Content>

      {!isArchive && (
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateProject}
        />
      )}
    </>
  )
} 