import styled from 'styled-components'

export const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  padding: 20px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
`

export const ChartTypeToggle = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  justify-content: flex-end;
`

export const ToggleButton = styled.button<{ active: boolean }>`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? theme.colors.surface : theme.colors.primary};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active, theme }) => active ? theme.colors.primary : `${theme.colors.primary}20`};
  }
` 