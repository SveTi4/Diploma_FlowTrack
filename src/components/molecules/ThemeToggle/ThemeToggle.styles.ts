import styled from 'styled-components'

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s ease;
  cursor: pointer;
  padding: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundHover};
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 20px;
    height: 20px;
  }
` 