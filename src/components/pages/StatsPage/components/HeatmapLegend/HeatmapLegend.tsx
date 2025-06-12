import { useColorIntensity } from '../../../../../hooks/useColorIntensity.ts';
import { LegendContainer, LegendItem, ColorBox, LegendText } from './HeatmapLegend.styles.ts';

export const HeatmapLegend = () => {
  const { getColor } = useColorIntensity();

  const legendItems = [
    { count: 0, text: 'Нет активности' },
    { count: 1, text: '1-3 вклада' },
    { count: 4, text: '4-6 вкладов' },
    { count: 7, text: '7-9 вкладов' },
    { count: 10, text: '10+ вкладов' },
  ];

  return (
    <LegendContainer>
      {legendItems.map((item) => (
        <LegendItem key={item.count}>
          <ColorBox color={getColor(item.count)} />
          <LegendText>{item.text}</LegendText>
        </LegendItem>
      ))}
    </LegendContainer>
  );
}; 