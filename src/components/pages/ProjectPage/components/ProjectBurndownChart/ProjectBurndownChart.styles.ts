import styled from 'styled-components';

export const ChartContainer = styled.div`
  margin-top: 16px;
  height: 300px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  padding: 16px;
  font-size: 14px;
`; 