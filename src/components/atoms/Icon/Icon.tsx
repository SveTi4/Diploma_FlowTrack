import styled from 'styled-components'

// Временные иконки, потом можно заменить на SVG
const icons = {
  profile: '👤',
  stats: '📊',
  projects: '📁',
  guides: '📚',
  notifications: '🔔',
  archive: '📦',
  support: '❓'
}

interface IconProps {
  name: keyof typeof icons
  size?: number
}

export const StyledIcon = styled.span<{ size?: number }>`
  font-size: ${({ size }) => size ? `${size}px` : '18px'};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const Icon = ({ name, size }: IconProps) => (
  <StyledIcon size={size}>{icons[name]}</StyledIcon>
) 