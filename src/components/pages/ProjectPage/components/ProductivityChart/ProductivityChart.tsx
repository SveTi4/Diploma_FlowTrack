import React, { useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { ru } from 'date-fns/locale'
import { ChartContainer, ChartTypeToggle, ToggleButton } from './ProductivityChart.styles'
import { useTheme } from 'styled-components'

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

interface ProductivityData {
  day: string
  count: number
}

interface ProductivityChartProps {
  data: ProductivityData[]
}

type ChartType = 'line' | 'bar'

export const ProductivityChart: React.FC<ProductivityChartProps> = ({ data }) => {
  const theme = useTheme()
  const [chartType, setChartType] = useState<ChartType>('line')

  const chartData = {
    labels: data.map(item => item.day),
    datasets: [
      {
        label: 'Активность',
        data: data.map(item => item.count),
        borderColor: theme.colors.primary,
        backgroundColor: `${theme.colors.primary}80`,
        tension: 0.4,
        fill: chartType === 'line',
        pointBackgroundColor: theme.colors.primary,
        pointBorderColor: theme.colors.surface,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2
      }
    ]
  }

  const options: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day',
          displayFormats: {
            day: 'd MMM'
          }
        },
        adapters: {
          date: {
            locale: ru
          }
        },
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold'
          },
          color: theme.colors.text
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
            weight: 'bold'
          },
          color: theme.colors.text
        },
        grid: {
          color: `${theme.colors.text}20`
        }
      }
    }
  }

  return (
    <ChartContainer>
      <ChartTypeToggle>
        <ToggleButton 
          active={chartType === 'line'} 
          onClick={() => setChartType('line')}
        >
          Линейный
        </ToggleButton>
        <ToggleButton 
          active={chartType === 'bar'} 
          onClick={() => setChartType('bar')}
        >
          Столбчатый
        </ToggleButton>
      </ChartTypeToggle>
      {chartType === 'line' ? (
        <Line data={chartData} options={options} />
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </ChartContainer>
  )
} 