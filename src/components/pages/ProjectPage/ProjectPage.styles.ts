import styled from 'styled-components'

export const MainContent = styled.div`
  flex: 1;
  padding: 32px;
  width: 100%;
  height: calc(100vh - 80px);
`

export const Chart = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
`