import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { ChartContainer, ErrorMessage } from './ProjectBurndownChart.styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ProjectBurndownChartProps {
  burndownData: Array<{
    day: string;
    remains: number;
  }>;
  totalTasks: number;
  daysElapsed: number;
  daysLeft: number | null;
}

export const ProjectBurndownChart: React.FC<ProjectBurndownChartProps> = ({ 
  burndownData, 
  totalTasks, 
  daysElapsed, 
  daysLeft 
}) => {
  // Проверка на краевые случаи
  if (totalTasks === 0) {
    return (
      <ChartContainer>
        <ErrorMessage>Нет данных для отображения: в проекте нет задач</ErrorMessage>
      </ChartContainer>
    );
  }

  if (daysElapsed === 0) {
    return (
      <ChartContainer>
        <ErrorMessage>Нет данных для отображения: проект только создан</ErrorMessage>
      </ChartContainer>
    );
  }

  if (burndownData.length === 0) {
    return (
      <ChartContainer>
        <ErrorMessage>Нет данных для отображения: отсутствует история задач</ErrorMessage>
      </ChartContainer>
    );
  }

  const daysTotal = daysElapsed + (daysLeft || 0);
  const chartData = {
    labels: burndownData.map(item => item.day),
    datasets: [
      {
        label: 'Фактическое',
        data: burndownData.map(item => item.remains),
        borderColor: 'rgb(75,192,192)',
        backgroundColor: 'rgba(75,192,192,0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      ...(daysLeft !== null ? [{
        label: 'Плановое',
        data: burndownData.map((_, idx) => 
          Math.max(Math.round(totalTasks * (1 - idx / daysTotal)), 0)
        ),
        borderColor: 'rgb(192,75,75)',
        backgroundColor: 'rgba(192,75,75,0.1)',
        borderDash: [5, 5],
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0
      }] : [])
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          title: (context: any) => {
            const date = new Date(context[0].label);
            return date.toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });
          },
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value} задач`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            size: 12
          },
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            size: 12
          }
        },
        title: {
          display: true,
          text: 'Осталось задач',
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <ChartContainer>
      <Line data={chartData} options={chartOptions} />
    </ChartContainer>
  );
}; 