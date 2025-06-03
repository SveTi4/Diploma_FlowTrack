import styled, { css } from 'styled-components'

export const getVariantStyles = (variant: 'primary' | 'secondary' | 'ghost') => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${({ theme }) => theme.colors.primary};
        border: 1px solid ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.light};
        &:hover:not(:disabled) {
          background: transparent;
          color: ${({ theme }) => theme.colors.primary};
        }
      `
    case 'secondary':
      return css`
        background: transparent;
        border: 1px solid ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.secondary};
        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.secondary};
          color: ${({ theme }) => theme.colors.light};
        }
      `
    case 'ghost':
      return css`
        background: transparent;
        color: ${({ theme }) => theme.colors.ghost};
        border: 1px solid ${({ theme }) => theme.colors.ghost};
        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.ghost};
          color: ${({ theme }) => theme.colors.light};
        }
      `
    default:
      return css`
        background: #007AFF;
        color: white;
        &:hover:not(:disabled) {
          background: #0066CC;
        }
      `
  }
}

export const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return css`
        padding: 6px 12px;
        font-size: 12px;
      `
    case 'large':
      return css`
        padding: 12px 24px;
        font-size: 16px;
      `
    default:
      return css`
        padding: 8px 16px;
        font-size: 14px;
      `
  }
}

export const StyledButton = styled.button<{ 
  variant: 'primary' | 'secondary' | 'ghost',
  size: 'small' | 'medium' | 'large'
}>`
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 16px;
    height: 16px;
  }
` 