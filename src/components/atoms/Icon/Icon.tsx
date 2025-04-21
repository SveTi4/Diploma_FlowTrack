import styled from 'styled-components'
import { ReactNode } from 'react'

interface IconProps {
  size?: number
  color?: string
  children: ReactNode
}

const IconWrapper = styled.div<{ size: number, color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  color: ${({ color }) => color || 'inherit'};
  
  svg {
    width: 100%;
    height: 100%;
  }
`

export const Icon = ({ size = 24, color, children }: IconProps) => {
  return (
    <IconWrapper size={size} color={color}>
      {children}
    </IconWrapper>
  )
} 