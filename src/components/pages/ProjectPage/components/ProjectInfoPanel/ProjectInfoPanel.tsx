import React, { useEffect, useState } from 'react'
import { Section, SectionTitle, EditableDescription } from '../../../../molecules'
import { Project, ProjectMetrics } from '../../../../../api/services'
import { AppDispatch } from '../../../../../store'
import { updateProject } from '../../../../../store/projects/projectsSlice'
import { fetchProjectMetrics } from '../../../../../store/projects/projectMetricsSlice'
import { Loader } from '../../../../atoms'
import { ProjectMetrics as ProjectMetricsComponent } from '../ProjectMetrics/ProjectMetrics'
import { ProductivityChart } from '../ProductivityChart/ProductivityChart'

interface ProductivityData {
  day: string
  count: number
}

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
  const [productivityData, setProductivityData] = useState<ProductivityData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadMetrics = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await dispatch(fetchProjectMetrics(project.id)).unwrap()
      setMetrics(response.data)
      // TODO: Здесь будет загрузка данных для графика
      // Временно используем тестовые данные
      setProductivityData([
        { day: "2025-06-03T00:00:00Z", count: 5 },
        { day: "2025-06-04T00:00:00Z", count: 8 },
        { day: "2025-06-05T00:00:00Z", count: 3 },
        { day: "2025-06-06T00:00:00Z", count: 12 },
        { day: "2025-06-07T00:00:00Z", count: 7 },
        { day: "2025-06-08T00:00:00Z", count: 9 },
        { day: "2025-06-09T00:00:00Z", count: 4 }
      ])
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
          <SectionTitle>График активности</SectionTitle>
          <ProductivityChart data={productivityData} />
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
              
              await loadMetrics()
              
              updatePanel({
                content: renderPanelContent({ ...currentProject, description: newDescription })
              });
            }}
            placeholder="Добавьте описание проекта..."
          />
        </Section>
      </>
    )
  }

  return renderPanelContent(project)
} 