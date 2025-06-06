import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const StatusIndicator = styled.div<{ status: 'green' | 'yellow' | 'red' }>`
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  color: white;
  background-color: ${props => 
    props.status === 'green' ? '#4caf50' :
    props.status === 'yellow' ? '#ff9800' : '#f44336'
  };
  margin-bottom: 16px;
  display: inline-block;
  font-size: 14px;
`;

const StatusDetails = styled.div`
  margin-top: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`;

const MetricsContainer = styled.div`
  margin-top: 16px;
  font-size: 14px;
  
  p {
    margin: 8px 0;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 13px;
  margin-top: 8px;
`;

interface ProjectProgressProps {
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
  };
}

export const ProjectProgress: React.FC<ProjectProgressProps> = ({ progress }) => {
  const getStatusInfo = () => {
    // Проверка на краевые случаи
    if (progress.total_tasks === 0) {
      return {
        text: 'ℹ️ Проект без задач',
        details: 'Добавьте задачи в проект для отслеживания прогресса'
      };
    }

    if (progress.days_elapsed === 0) {
      return {
        text: 'ℹ️ Проект только создан',
        details: 'Прогресс будет доступен после начала работы над задачами'
      };
    }

    if (progress.v_real === 0) {
      return {
        text: '⚠️ Нет прогресса',
        details: 'За последний период не было выполнено ни одной задачи'
      };
    }

    if (progress.days_left === null) {
      return {
        text: '✅ Проект без дедлайна',
        details: `Текущая скорость: ${progress.v_real.toFixed(1)} задач/день`
      };
    }

    const speedDiff = progress.v_req! - progress.v_real;
    const speedDiffPercent = Math.round((speedDiff / progress.v_req!) * 100);
    
    switch (progress.status) {
      case 'green':
        return {
          text: '✅ Проект идет по плану',
          details: `Текущая скорость (${progress.v_real.toFixed(1)} задач/день) выше требуемой (${progress.v_req!.toFixed(1)} задач/день)`
        };
      case 'yellow':
        return {
          text: '⚠️ Требуется ускориться',
          details: `Нужно увеличить скорость на ${speedDiffPercent}% (с ${progress.v_real.toFixed(1)} до ${progress.v_req!.toFixed(1)} задач/день)`
        };
      case 'red':
        return {
          text: '❌ Проект в критическом состоянии',
          details: progress.days_left === 0 
            ? 'Дедлайн наступил, а задачи не завершены'
            : `Текущая скорость (${progress.v_real.toFixed(1)} задач/день) значительно ниже требуемой (${progress.v_req!.toFixed(1)} задач/день)`
        };
      default:
        return { text: '', details: '' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <ProgressContainer>
      <StatusIndicator status={progress.status}>
        {statusInfo.text}
      </StatusIndicator>
      <StatusDetails>
        {statusInfo.details}
      </StatusDetails>

      <MetricsContainer>
        <p>Выполнено задач: {progress.done_tasks} из {progress.total_tasks}</p>
        <p>Текущая скорость: {progress.v_real.toFixed(1)} задач/день</p>
        {progress.days_left !== null && (
          <>
            <p>Требуемая скорость: {progress.v_req!.toFixed(1)} задач/день</p>
            <p>Прогнозируемая дата: {progress.projected_finish_date || 'Не определена'}</p>
          </>
        )}
        {progress.v_real === 0 && progress.days_elapsed > 0 && (
          <ErrorMessage>
            Внимание: за последний период не было выполнено ни одной задачи
          </ErrorMessage>
        )}
      </MetricsContainer>
    </ProgressContainer>
  );
}; 