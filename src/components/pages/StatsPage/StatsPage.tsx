import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { fetchHeatmap } from '../../../store/heatmap/heatmapSlice.ts';
import { PageHeader } from '../../molecules';
import { HeatmapChart } from './components/HeatmapChart/HeatmapChart.tsx';
import { WeekdayActivityChart } from './components/WeekdayActivityChart/WeekdayActivityChart.tsx';
import { MonthlyActivityChart } from './components/MonthlyActivityChart/MonthlyActivityChart.tsx';
import { Container, Content, ChartsContainer, ChartWrapper } from './StatsPage.styles';

export const StatsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: heatmapData, loading, error } = useSelector((state: RootState) => state.heatmap);

  useEffect(() => {
    dispatch(fetchHeatmap());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!heatmapData) {
    return null;
  }

  return (
    <Container>
      <PageHeader title="Статистика" />
      <Content>
        <HeatmapChart data={heatmapData} />
        <ChartsContainer>
          <ChartWrapper>
            <WeekdayActivityChart data={heatmapData} />
          </ChartWrapper>
          <ChartWrapper>
            <MonthlyActivityChart data={heatmapData} />
          </ChartWrapper>
        </ChartsContainer>
      </Content>
    </Container>
  );
}; 