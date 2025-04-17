import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../molecules/PageHeader/PageHeader'

const Container = styled.div`
  min-height: 100vh;
  background: #1C1C1E;
  display: flex;
  flex-direction: column;
`

const TopSection = styled.div`
  height: 40vh;
  min-height: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 24px;
`

const BottomSection = styled.div`
  flex: 1;
  padding: 24px;
  background: rgba(0, 0, 0, 0.2);
`

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
`

const CardTitle = styled.h3`
  color: white;
  font-size: 16px;
  margin-bottom: 16px;
`

const ProgressInfo = styled.div`
  color: rgba(255, 255, 255, 0.6);
  margin: 16px 0;
`

const ProgressBar = styled.div<{ progress: number }>`
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin: 16px 0;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ progress }) => progress}%;
    background: #007AFF;
    transition: width 0.3s ease;
  }
`

const Description = styled.p`
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
`

const Chart = styled.div`
  width: 100%;
  height: calc(100% - 50px); // вычитаем высоту заголовка
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.3);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`

// Временные данные для примера
const mockProjectDetails = {
  1: {
    title: 'Проект 1',
    description: 'Подробное описание проекта и его целей',
    progress: 75,
    timeLeft: 'Осталось: 5 дней 4 часа',
    tasks: []
  },
  2: {
    title: 'Проект номер 2',
    description: 'Подробное описание проекта номер 2. Проект успешно завершен.',
    progress: 100,
    timeLeft: 'Завершен',
    tasks: [
      { id: 1, title: 'Задача 1', status: 'completed' },
      { id: 2, title: 'Задача 2', status: 'completed' }
    ]
  },
  3: {
    title: 'Проект номер 3',
    description: 'Подробное описание проекта номер 3. Проект находится на начальной стадии реализации.',
    progress: 35,
    timeLeft: 'Осталось: 2 недели',
    tasks: [
      { id: 1, title: 'Задача 1', status: 'in_progress' },
      { id: 2, title: 'Задача 2', status: 'pending' },
      { id: 3, title: 'Задача 3', status: 'pending' }
    ]
  }
}

interface Task {
  id: number
  title: string
  status: string
}

export const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  
  // @ts-ignore - игнорируем для демо
  const project = mockProjectDetails[id]

  if (!project) {
    return <div>Проект не найден</div>
  }

  return (
    <Container>
      <PageHeader 
        title={project.title}
        showBackButton
      />
      <TopSection>
        <Card>
          <CardTitle>Общий прогресс:</CardTitle>
          <ProgressInfo>
            <div>Прогресс: {project.progress}%</div>
            <div>{project.timeLeft}</div>
          </ProgressInfo>
          <ProgressBar progress={project.progress} />
        </Card>

        <Card>
          <CardTitle>График продуктивности:</CardTitle>
          <Chart>График будет добавлен позже</Chart>
        </Card>

        <Card>
          <CardTitle>Описание проекта:</CardTitle>
          <Description>{project.description}</Description>
        </Card>
      </TopSection>

      <BottomSection>
        <Card>
          <CardTitle>Задачи</CardTitle>
          {project.tasks.map(task => (
            <div key={task.id} style={{ margin: '8px 0' }}>
              • {task.title} - {task.status}
            </div>
          ))}
        </Card>
      </BottomSection>
    </Container>
  )
} 