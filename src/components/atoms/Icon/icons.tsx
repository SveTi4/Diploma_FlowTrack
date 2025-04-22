import { Icon } from './Icon'

export const PlusIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const CheckIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const CloseIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const ArrowRightIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const StatsIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const ProjectsIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 4V20M16 4V20M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const GuidesIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const NotificationsIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.857 17.082C14.426 18.237 13.259 19 12 19C10.741 19 9.574 18.237 9.143 17.082M16 7C16 4.791 14.209 3 12 3C9.791 3 8 4.791 8 7V13L5 16H19L16 13V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const ArchiveIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 8H19M5 8C3.89543 8 3 7.10457 3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6C21 7.10457 20.1046 8 19 8M5 8L5 18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V8M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const SupportIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.879 7.519C11.05 6.494 12.95 6.494 14.121 7.519C15.293 8.544 15.293 10.456 14.121 11.481C13.918 11.661 13.691 11.811 13.447 11.927C12.755 12.252 12.295 12.926 12.295 13.676V14M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
) 

export const RefreshIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M4 12L4 16L8 16"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M16.0002 8.5C15.3432 7.56251 14.4797 6.81391 13.4866 6.31213C12.4935 5.81035 11.4002 5.57076 10.3002 5.615"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      />
    </svg>
  </Icon>
)