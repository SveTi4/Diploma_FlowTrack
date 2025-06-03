import { ReactNode } from 'react'
import { StyledButton } from './Button.styles'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

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