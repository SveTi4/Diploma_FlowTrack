import React, { useEffect, useState } from 'react'
import { Section, SectionTitle, EditableDescription } from '../../../../molecules'
import { Project, ProjectMetrics, ProductivityData } from '../../../../../api/services'
import { AppDispatch } from '../../../../../store'
import { updateProject } from '../../../../../store/projects/projectsSlice'
import { fetchProjectMetrics } from '../../../../../store/projects/projectMetricsSlice'
import { fetchProjectProductivity } from '../../../../../store/projects/projectProductivitySlice'
import { Loader } from '../../../../atoms'
import { ProjectMetrics as ProjectMetricsComponent } from '../ProjectMetrics/ProjectMetrics'
import { ProductivityChart } from '../ProductivityChart/ProductivityChart'
import { EditableDate } from '../../../../molecules/EditableDate/EditableDate'
import styled from 'styled-components'

interface ProjectInfoPanelProps {
  project: Project
  dispatch: AppDispatch
  updatePanel: (props: { content: React.ReactNode }) => void
}

const DeadlineRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DeadlineLabel = styled.span`
  color: #888;
  font-size: 14px;
  min-width: 60px;
`;

export const ProjectInfoPanel: React.FC<ProjectInfoPanelProps> = ({
  project,
  dispatch,
  updatePanel,
}) => {
  const [metrics, setMetrics] = useState<ProjectMetrics | null>(null)
  const [productivityData, setProductivityData] = useState<ProductivityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadMetrics = async () => {
    setLoading(true)
    setError(null)
    try {
      const [metricsResponse, productivityResponse] = await Promise.all([
        dispatch(fetchProjectMetrics(project.id)).unwrap(),
        dispatch(fetchProjectProductivity(project.id)).unwrap()
      ])
      setMetrics(metricsResponse.data)
      setProductivityData(productivityResponse.data)
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
    if (!metrics || !productivityData) return null;

    return (
      <>
        <Section style={{ paddingBottom: 0, paddingTop: 0 }}>
          <DeadlineRow>
            <DeadlineLabel>Дедлайн</DeadlineLabel>
            <EditableDate
              value={currentProject.deadline}
              onSave={async (newDeadline) => {
                await dispatch(updateProject({
                  id: currentProject.id,
                  data: { deadline: newDeadline }
                })).unwrap();
                await loadMetrics();
                updatePanel({
                  content: renderPanelContent({ ...currentProject, deadline: newDeadline })
                });
              }}
              placeholder="Установите дедлайн"
            />
          </DeadlineRow>
        </Section>
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