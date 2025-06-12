import styled from 'styled-components';

export const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ColorBox = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  background-color: ${({ color }) => color};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const LegendText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
`; 