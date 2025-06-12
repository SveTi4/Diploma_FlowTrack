import styled from 'styled-components';

export const ChartContainer = styled.div`
  width: 95%;
  height: 200px;
  margin: auto;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;
  text-align: center;
`; 