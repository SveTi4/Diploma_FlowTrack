import React, { useEffect, useState } from 'react'
import { Section, SectionTitle, EditableDescription } from '../../../../molecules'
import { Project, ProjectMetrics } from '../../../../../api/services'
import { AppDispatch } from '../../../../../store'
import { updateProject } from '../../../../../store/projects/projectsSlice'
import { fetchProjectMetrics } from '../../../../../store/projects/projectMetricsSlice'
import { Loader } from '../../../../atoms'
import { ProjectMetrics as ProjectMetricsComponent } from '../ProjectMetrics/ProjectMetrics'

interface ProjectInfoPanelProps {
  project: Project
  dispatch: AppDispatch
  updatePanel: (props: { content: React.ReactNode }) => void
}

export const ProjectInfoPanel: React.FC<ProjectInfoPanelProps> = ({
  project,
  dispatch,
  updatePanel,
}) => {
  const [metrics, setMetrics] = useState<ProjectMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadMetrics = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await dispatch(fetchProjectMetrics(project.id)).unwrap()
      setMetrics(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при загрузке метрик')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMetrics()
  }, [project.id])

  const renderPanelContent = (currentProject: Project) => {
    if (loading) return <Loader size="large" />
    if (error) return <div>Ошибка: {error}</div>
    if (!metrics) return null;

    return (
      <>
        <Section>
          <SectionTitle>Общий прогресс</SectionTitle>
          <ProjectMetricsComponent metrics={metrics} />
        </Section>

        <Section>
          <SectionTitle>Описание</SectionTitle>
          <EditableDescription
            value={currentProject.description || ''}
            onSave={async (newDescription) => {
              await dispatch(updateProject({ 
                id: currentProject.id, 
                data: { description: newDescription } 
              })).unwrap();
              
              // Перезагружаем метрики после обновления проекта
              await loadMetrics()
              
              updatePanel({
                content: renderPanelContent({ ...currentProject, description: newDescription })
              });
            }}
            placeholder="Добавьте описание проекта..."
          />
        </Section>

        <Section>
          <SectionTitle>График продуктивности</SectionTitle>
        </Section>
      </>
    )
  }

  return renderPanelContent(project)
} 