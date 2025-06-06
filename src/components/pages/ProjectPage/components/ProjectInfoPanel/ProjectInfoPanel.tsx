import React from 'react'
import { Section, SectionTitle, EditableDescription } from '../../../../molecules'
import { Project } from '../../../../../api/services'
import { AppDispatch } from '../../../../../store'
import { updateProject } from '../../../../../store/projects/projectsSlice'
import { ProjectProgress } from '../ProjectProgress/ProjectProgress'
import { ProjectBurndownChart } from '../ProjectBurndownChart/ProjectBurndownChart'
import { Loader } from '../../../../atoms'
import { ProjectBurndownData } from '../../../../../api/services/projects/types'

interface ProjectInfoPanelProps {
  project: Project
  dispatch: AppDispatch
  updatePanel: (props: { content: React.ReactNode }) => void
  progress: {
    total_tasks: number;
    done_tasks: number;
    days_elapsed: number;
    days_left: number | null;
    v_real: number;
    v_req: number | null;
    percent_done: number;
    projected_finish_date: string | null;
    status: 'green' | 'yellow' | 'red';
  } | null;
  burndownData: ProjectBurndownData | null;
  loading: boolean;
  error: string | null;
}

export const ProjectInfoPanel: React.FC<ProjectInfoPanelProps> = ({
  project,
  dispatch,
  updatePanel,
  progress,
  burndownData,
  loading,
  error
}) => {
  if (loading) return <Loader size="large" />
  if (error) return <div>Ошибка: {error}</div>
  if (!progress || !burndownData) return null;

  return (
    <>
      <Section>
        <SectionTitle>Общий прогресс</SectionTitle>
        <ProjectProgress progress={progress} />
      </Section>

      <Section>
        <SectionTitle>Описание</SectionTitle>
        <EditableDescription
          value={project.description || ''}
          onSave={async (newDescription) => {
            await dispatch(updateProject({ 
              id: project.id, 
              data: { description: newDescription } 
            })).unwrap();
            
            updatePanel({
              content: (
                <ProjectInfoPanel
                  project={{ ...project, description: newDescription }}
                  dispatch={dispatch}
                  updatePanel={updatePanel}
                  progress={progress}
                  burndownData={burndownData}
                  loading={loading}
                  error={error}
                />
              )
            });
          }}
          placeholder="Добавьте описание проекта..."
        />
      </Section>

      <Section>
        <SectionTitle>График продуктивности</SectionTitle>
        <ProjectBurndownChart 
          burndownData={burndownData.data}
          totalTasks={burndownData.totalTasks}
          daysElapsed={burndownData.daysElapsed}
          daysLeft={burndownData.daysLeft}
        />
      </Section>
    </>
  )
} 