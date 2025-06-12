import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { format, getDay, parseISO, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useColorIntensity } from '../../../../../hooks/useColorIntensity.ts';
import { ChartContainer, Title } from './HeatmapChart.styles.ts';
import { HeatmapLegend } from '../HeatmapLegend/HeatmapLegend.tsx';
import { useTheme } from 'styled-components';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface HeatmapData {
  day: string;
  count: number;
}

interface HeatmapChartProps {
  data: HeatmapData[];
}

export const HeatmapChart = ({ data }: HeatmapChartProps) => {
  const { getColor } = useColorIntensity();
  const theme = useTheme();
  const startDate = new Date(new Date().getFullYear(), 0, 1);

  const dataPoints = data.map((d) => {
    const date = parseISO(d.day);
    const dayOfWeek = getDay(date);
    const daysSinceStart = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const weekIndex = Math.floor(daysSinceStart / 7);
    
    const adjustedWeekIndex = dayOfWeek < getDay(startDate) ? weekIndex + 1 : weekIndex;
    
    return {
      x: adjustedWeekIndex,
      y: 6 - dayOfWeek,
      count: d.count,
      date: date,
      isCurrentDay: isToday(date),
    };
  });

  const chartData = {
    datasets: [{
      label: 'Contributions',
      data: dataPoints.map(d => ({
        x: d.x,
        y: d.y,
        count: d.count,
        date: d.date,
        isCurrentDay: d.isCurrentDay,
      })),
      backgroundColor: dataPoints.map(d => getColor(d.count)),
      pointStyle: 'rect',
      pointRadius: 8,
      borderWidth: dataPoints.map(d => d.isCurrentDay ? 1 : 0),
      borderColor: dataPoints.map(d => d.isCurrentDay ? theme.colors.text : 'transparent'),
      hoverBackgroundColor: 'white',
      hoverBorderColor: 'black',
      hoverBorderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear' as const,
        min: -0.5,
        max: 52.5,
        ticks: {
          stepSize: 1,
          callback: function(tickValue: number | string) {
            const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
            const monthIndex = Math.floor(Number(tickValue) * 7 / 30.44);
            return monthIndex >= 0 && monthIndex < 12 ? monthNames[monthIndex] : '';
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear' as const,
        min: -0.5,
        max: 6.5,
        ticks: {
          stepSize: 1,
          callback: function(tickValue: number | string) {
            const days = ['Сб', 'Пт', 'Чт', 'Ср', 'Вт', 'Пн', 'Вс'];
            const index = Math.round(Number(tickValue));
            return index >= 0 && index < 7 ? days[index] : '';
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'scatter'>) => {
            const point = context.raw as { count: number; date: Date };
            return `${format(point.date, 'd MMMM, yyyy', { locale: ru })}: ${point.count} вкладов`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <Title>Активность за текущий год</Title>
      <ChartContainer>
        <Scatter data={chartData} options={options} />
      </ChartContainer>
      <HeatmapLegend />
    </>
  );
}; 