import styled from 'styled-components'

export const Chart = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
` 