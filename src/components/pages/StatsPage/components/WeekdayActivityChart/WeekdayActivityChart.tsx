import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title as ChartTitle, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getDay, parseISO } from 'date-fns';
import { useTheme } from 'styled-components';
import { ChartContainer, Title } from '../HeatmapChart/HeatmapChart.styles.ts';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

interface HeatmapData {
  day: string;
  count: number;
}

interface WeekdayActivityChartProps {
  data: HeatmapData[];
}

export const WeekdayActivityChart = ({ data }: WeekdayActivityChartProps) => {
  const theme = useTheme();
  
  // Группируем данные по дням недели
  const weekdayData = data.reduce((acc, item) => {
    const date = parseISO(item.day);
    const dayOfWeek = getDay(date);
    acc[dayOfWeek] = (acc[dayOfWeek] || 0) + item.count;
    return acc;
  }, {} as Record<number, number>);

  // Сортируем дни недели в правильном порядке (с воскресенья по субботу)
  const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const sortedData = weekdays.map((_, index) => weekdayData[index] || 0);

  const chartData = {
    labels: weekdays,
    datasets: [
      {
        label: 'Количество вкладов',
        data: sortedData,
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.raw} вкладов`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <Title>Активность по дням недели</Title>
      <ChartContainer>
        <Bar data={chartData} options={options} />
      </ChartContainer>
    </>
  );
}; 