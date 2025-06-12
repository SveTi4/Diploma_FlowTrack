import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title as ChartTitle, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getMonth, parseISO } from 'date-fns';
import { useTheme } from 'styled-components';
import { ChartContainer, Title } from '../HeatmapChart/HeatmapChart.styles.ts';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

interface HeatmapData {
  day: string;
  count: number;
}

interface MonthlyActivityChartProps {
  data: HeatmapData[];
}

export const MonthlyActivityChart = ({ data }: MonthlyActivityChartProps) => {
  const theme = useTheme();
  
  // Группируем данные по месяцам
  const monthlyData = data.reduce((acc, item) => {
    const date = parseISO(item.day);
    const month = getMonth(date);
    acc[month] = (acc[month] || 0) + item.count;
    return acc;
  }, {} as Record<number, number>);

  // Сортируем месяцы в правильном порядке
  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
  const sortedData = months.map((_, index) => monthlyData[index] || 0);

  const chartData = {
    labels: months,
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
          label: (context: TooltipItem<'bar'>) => {
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
      <Title>Активность по месяцам</Title>
      <ChartContainer>
        <Bar data={chartData} options={options} />
      </ChartContainer>
    </>
  );
}; 