import React from 'react'
import { Section, SectionTitle, EditableDescription } from '../../../../molecules'
import { ProgressBarComponent } from "../../../../atoms"
import { Chart } from './ProjectInfoPanel.styles'
import { Project } from '../../../../../api/services'
import { AppDispatch } from '../../../../../store'
import { updateProject } from '../../../../../store/projects/projectsSlice'

interface ProjectInfoPanelProps {
  project: Project
  dispatch: AppDispatch
  updatePanel: (props: { content: React.ReactNode }) => void
}

export const ProjectInfoPanel: React.FC<ProjectInfoPanelProps> = ({
  project,
  dispatch,
  updatePanel
}) => {
  return (
    <>
      <Section>
        <SectionTitle>Общий прогресс</SectionTitle>
        <ProgressBarComponent progress={project.progress ?? 0} timeLeft={''} />
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
                />
              )
            });
          }}
          placeholder="Добавьте описание проекта..."
        />
      </Section>

      <Section>
        <SectionTitle>График продуктивности</SectionTitle>
        <Chart>График будет добавлен позже</Chart>
      </Section>
    </>
  )
} 