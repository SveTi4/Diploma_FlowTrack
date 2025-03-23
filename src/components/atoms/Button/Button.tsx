import styled from 'styled-components'
import { BaseProps } from '../../../types/common'

interface ButtonProps extends BaseProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit' | 'reset'
}

const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  
  background: ${({ theme, variant }) => 
    variant === 'primary' ? theme.colors.primary : 'transparent'};
  color: ${({ theme, variant }) => 
    variant === 'primary' ? theme.colors.light : theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const Button = ({ 
  variant = 'primary',
  children,
  ...props 
}: ButtonProps) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  )
} 