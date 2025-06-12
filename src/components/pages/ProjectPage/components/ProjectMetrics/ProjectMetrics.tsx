import React from 'react';
import { ProgressBarComponent } from '../../../../../components/atoms/ProgressBar/ProgressBar';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import { ProjectMetrics as ProjectMetricsType } from "../../../../../api/services";
import styled from 'styled-components';

interface ProjectMetricsProps {
  metrics: ProjectMetricsType
}

const Container = styled.div`
  width: 100%;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin-bottom: 2px;
`;

const StatusDot = styled.span<{ status: string | null }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ status }) =>
    status === 'green' ? '#2e7d32' :
    status === 'yellow' ? '#f9a825' :
    status === 'red' ? '#c62828' :
    '#bdbdbd'};
  flex-shrink: 0;
`;

const StatusMain = styled.b`
  color: #444;
  font-weight: 600;
`;

const StatusSub = styled.span`
  color: #888;
  margin-left: 8px;
  font-weight: 400;
`;

const MetricsRow = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  margin-top: 4px;
  flex-wrap: wrap;
  color: #666;
`;

const statusMainText = (status: string | null) => {
  if (status === 'green') return 'По плану';
  if (status === 'yellow') return 'Есть риск';
  if (status === 'red') return 'Внимание';
  return 'Без дедлайна';
};

const statusSubText = (metrics: ProjectMetricsType) => {
  if (metrics.total_tasks === 0) {
    return 'В проекте пока нет задач. Добавьте задачи для отслеживания прогресса.';
  }
  if (metrics.total_tasks > 0 && metrics.done_tasks === metrics.total_tasks) {
    return 'Все задачи выполнены, проект завершён.';
  }
  if (metrics.status === 'green') {
    return 'Текущая скорость выше требуемой. Проект идёт с опережением графика.';
  }
  if (metrics.status === 'yellow') {
    return 'Скорость ниже требуемой. Если не ускориться, проект может не успеть к дедлайну.';
  }
  if (metrics.status === 'red') {
    if (metrics.days_left !== null && metrics.days_left < 0) {
      return 'Дедлайн проекта истёк, но задачи ещё не завершены.';
    }
    if (metrics.days_left === 0) {
      return 'Сегодня последний день, но задачи ещё не завершены.';
    }
    if (metrics.v_real === 0 && metrics.rem_tasks > 0) {
      return 'Нет прогресса по задачам, проект под угрозой срыва сроков.';
    }
    return 'Проект в критическом состоянии.';
  }
  return 'Проект не ограничен по времени, задачи можно выполнять в удобном темпе.';
};

export const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ metrics }) => {
  // Прогресс-бар
  const progress = Math.round(metrics.perception_done);
  const timeLeft =
    metrics.days_left === null
      ? 'Без дедлайна' :
      metrics.days_left < 0
        ? `Просрочено на ${Math.abs(metrics.days_left)} д.`
      : metrics.days_left === 0
        ? 'Дедлайн сегодня'
        : `Осталось ${metrics.days_left} д.`;

  // Прогнозируемая дата
  const projectedFinish =
    metrics.v_real === 0 || !metrics.projected_finish_date
      ? 'не известно'
      : format(new Date(metrics.projected_finish_date), 'd MMM yyyy', { locale: ru });

  const allTasksDone = metrics.total_tasks > 0 && metrics.done_tasks === metrics.total_tasks;

  return (
    <Container>
      <StatusRow>
        <StatusDot status={metrics.status} />
        <StatusMain>{statusMainText(metrics.status)}</StatusMain>
        <StatusSub>{statusSubText(metrics)}</StatusSub>
      </StatusRow>
      <ProgressBarComponent progress={progress} timeLeft={timeLeft} />
      <MetricsRow>
        <span>Задачи: {metrics.done_tasks}/{metrics.total_tasks}</span>
        <span>Скорость: {metrics.v_real.toFixed(1)}{metrics.status !== null && metrics.v_req !== null ? `/${Math.abs(metrics.v_req).toFixed(1)}` : ''} задач/д</span>
        {!allTasksDone && <span>Прогноз: {projectedFinish}</span>}
      </MetricsRow>
    </Container>
  );
}; 