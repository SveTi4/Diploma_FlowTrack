import styled from 'styled-components'

export const MainContent = styled.div`
  padding: 24px;
  height: calc(100vh - 64px);
  overflow: hidden;
  position: relative;

  @media (max-width: 480px) {
    padding: 16px;
    height: calc(100vh - 120px);
  }
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