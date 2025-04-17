import styled from 'styled-components'
import statsIcon from '../../../assets/stats.svg'
import projectsIcon from '../../../assets/projects.svg'
import guidesIcon from '../../../assets/guides.svg'
import notificationsIcon from '../../../assets/notifications.svg'
import archiveIcon from '../../../assets/archive.svg'
import supportIcon from '../../../assets/support.svg'

// Временные иконки, потом можно заменить на SVG
const icons = {
  stats: statsIcon,
  projects: projectsIcon,
  guides: guidesIcon,
  notifications: notificationsIcon,
  archive: archiveIcon,
  support: supportIcon
}

interface IconProps {
  name: keyof typeof icons
  size?: number
}

export const StyledIcon = styled.img<{ size?: number }>`
  width: ${({ size }) => size ? `${size}px` : '18px'};
  height: ${({ size }) => size ? `${size}px` : '18px'};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  filter: invert(71%) sepia(8%) saturate(106%) hue-rotate(169deg) brightness(87%) contrast(84%);

  .active & {
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
  }
`

export const Icon = ({ name, size }: IconProps) => (
  <StyledIcon src={icons[name]} alt={name} size={size} />
) 