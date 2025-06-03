import { ReactNode } from 'react'
import { IconWrapper } from './Icon.styles'

interface IconProps {
  size?: number
  color?: string
  children: ReactNode
}

export const Icon = ({ size = 24, color, children }: IconProps) => {
  return (
    <IconWrapper size={size} color={color}>
      {children}
    </IconWrapper>
  )
} 