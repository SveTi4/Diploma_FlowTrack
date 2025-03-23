import styled from 'styled-components'
import { PageHeader } from '../../molecules/PageHeader/PageHeader'
import { ProjectCard } from '../../molecules/ProjectCard/ProjectCard'

const Container = styled.div`
  min-height: 100vh;
  background: #1C1C1E;
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding: 24px;
`

// Временные данные для примера
const mockProjects = [
  {
    id: 1,
    title: 'Проект номер 1',
    description: 'Текст текст текст текст текст текст текст текст текст текст текст текст текст текст',
    progress: 75,
    timeLeft: 'Осталось: 5 дней 4 часа'
  },
  {
    id: 2,
    title: 'Проект номер 2',
    description: 'Текст текст текст текст текст текст текст текст текст текст текст текст текст текст',
    progress: 100,
    timeLeft: 'Завершен'
  },
  {
    id: 3,
    title: 'Проект номер 3',
    description: 'Текст текст текст текст текст текст текст текст текст текст текст текст текст текст',
    progress: 35,
    timeLeft: 'Осталось: 2 недели'
  }
]

export const ProjectsPage = () => {
  const handleSearch = (value: string) => {
    console.log('Search:', value)
  }

  const handleCreateProject = () => {
    console.log('Create project')
  }

  const handleProjectClick = (id: number) => {
    console.log('Project clicked:', id)
  }

  return (
    <Container>
      <PageHeader 
        title="Мои проекты"
        onSearch={handleSearch}
        onCreateClick={handleCreateProject}
      />
      <ProjectsGrid>
        {mockProjects.map(project => (
          <ProjectCard
            key={project.id}
            {...project}
            onClick={() => handleProjectClick(project.id)}
          />
        ))}
      </ProjectsGrid>
    </Container>
  )
} 