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
  transition: inherit;
  
  svg {
    width: inherit;
    height: 100%;
    transition: inherit;
  }
`

export const Icon = ({ size = 24, color, children }: IconProps) => {
  return (
    <IconWrapper size={size} color={color}>
      {children}
    </IconWrapper>
  )
} 