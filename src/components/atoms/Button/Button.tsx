import styled, { css } from 'styled-components'
import { ReactNode } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const getVariantStyles = (variant: ButtonProps['variant']) => {
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

const getSizeStyles = (size: ButtonProps['size']) => {
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

const StyledButton = styled.button<{ variant: ButtonProps['variant'], size: ButtonProps['size'] }>`
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

export const Button = ({ 
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled,
  type = 'button'
}: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </StyledButton>
  )
} 