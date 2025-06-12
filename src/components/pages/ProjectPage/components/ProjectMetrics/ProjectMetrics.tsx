import React from 'react';
import {
  ProgressContainer,
  StatusIndicator,
  StatusDetails,
  MetricsContainer,
  ErrorMessage
} from './ProjectMetrics.styles';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';

interface ProjectMetricsProps {
  metrics: {
    total_tasks: number;
    done_tasks: number;
    days_elapsed: number;
    days_left: number | null;
    v_real: number;
    v_req: number | null;
    perception_done: number;
    projected_finish_date: string | null;
    status: 'green' | 'yellow' | 'red';
  };
}

export const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ metrics }) => {
  const getStatusInfo = () => {
    // Проверка на краевые случаи
    if (metrics.total_tasks === 0) {
      return {
        text: 'ℹ️ Проект без задач',
        details: 'Добавьте задачи в проект для отслеживания прогресса'
      };
    }

    if (metrics.days_elapsed === 0) {
      return {
        text: 'ℹ️ Проект только создан',
        details: 'Прогресс будет доступен после начала работы над задачами'
      };
    }

    if (metrics.v_real === 0) {
      return {
        text: '⚠️ Нет прогресса',
        details: 'За последний период не было выполнено ни одной задачи'
      };
    }

    if (metrics.days_left === null) {
      return {
        text: '✅ Проект без дедлайна',
        details: `Текущая скорость: ${metrics.v_real.toFixed(1)} задач/день`
      };
    }

    const speedDiff = Math.abs(metrics.v_req!) - metrics.v_real;
    const speedDiffPercent = Math.round((speedDiff / Math.abs(metrics.v_req!)) * 100);
    
    switch (metrics.status) {
      case 'green':
        return {
          text: '✅ Проект идет по плану',
          details: `Текущая скорость (${metrics.v_real.toFixed(1)} задач/день) выше требуемой (${Math.abs(metrics.v_req!).toFixed(1)} задач/день)`
        };
      case 'yellow':
        return {
          text: '⚠️ Требуется ускориться',
          details: `Нужно увеличить скорость на ${speedDiffPercent}% (с ${metrics.v_real.toFixed(1)} до ${Math.abs(metrics.v_req!).toFixed(1)} задач/день)`
        };
      case 'red':
        return {
          text: '❌ Проект в критическом состоянии',
          details: metrics.days_left === 0 
            ? 'Дедлайн наступил, а задачи не завершены'
            : `Текущая скорость (${metrics.v_real.toFixed(1)} задач/день) значительно ниже требуемой (${Math.abs(metrics.v_req!).toFixed(1)} задач/день)`
        };
      default:
        return { text: '', details: '' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <ProgressContainer>
      <StatusIndicator status={metrics.status}>
        {statusInfo.text}
      </StatusIndicator>
      <StatusDetails>
        {statusInfo.details}
      </StatusDetails>

      <MetricsContainer>
        <p>Выполнено задач: {metrics.done_tasks} из {metrics.total_tasks}</p>
        <p>Текущая скорость: {metrics.v_real.toFixed(1)} задач/день</p>
        {metrics.days_left !== null && (
          <>
            <p>Требуемая скорость: {Math.abs(metrics.v_req!).toFixed(1)} задач/день</p>
            <p>Прогнозируемая дата: {format(new Date(metrics.projected_finish_date!), 'd MMMM yyyy', { locale: ru }) || 'Не определена'}</p>
          </>
        )}
        {metrics.v_real < 1 && metrics.days_elapsed > 0 && (
          <ErrorMessage>
            Внимание: за последний период не было выполнено ни одной задачи
          </ErrorMessage>
        )}
      </MetricsContainer>
    </ProgressContainer>
  );
}; 