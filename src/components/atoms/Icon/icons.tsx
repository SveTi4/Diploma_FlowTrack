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
    {/*<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
    {/*  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>*/}
    {/*</svg>*/}
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.2803 9.28033C17.5732 8.98744 17.5732 8.51256 17.2803 8.21967C16.9874 7.92678 16.5126 7.92678 16.2197 8.21967L10.25 14.1893L7.78033 11.7197C7.48744 11.4268 7.01256 11.4268 6.71967 11.7197C6.42678 12.0126 6.42678 12.4874 6.71967 12.7803L9.71967 15.7803C10.0126 16.0732 10.4874 16.0732 10.7803 15.7803L17.2803 9.28033Z"
        fill="currentColor"/>
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12Z"
            fill="currentColor"/>
    </svg>

  </Icon>
)

export const CloseIcon = ({size, color}: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const ArrowLeftIcon = ({size, color}: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const ArrowRightIcon = ({size, color}: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const StatsIcon = ({size, color}: { size?: number; color?: string }) => (
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

export const InfoIcon = ({ size, color }: { size?: number; color?: string }) => (
    <Icon size={size} color={color}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </Icon>
)

export const TrashIcon = ({ size, color }: { size?: number; color?: string }) => (
    <Icon size={size} color={color}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M3 7H21M17 7V4C17 3.44772 16.5523 3 16 3H8C7.44772 3 7 3.44772 7 4V7"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </Icon>
)

export const RefreshIcon = ({size, color}: { size?: number; color?: string }) => (
    <Icon size={size} color={color}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path
                    d="M4.266 16.06a8.923 8.923 0 0 0 3.915 3.978a8.706 8.706 0 0 0 5.471.832a8.796 8.796 0 0 0 4.887-2.64a9.067 9.067 0 0 0 2.388-5.079a9.137 9.137 0 0 0-1.044-5.53a8.904 8.904 0 0 0-4.068-3.815a8.7 8.7 0 0 0-5.5-.608c-1.85.401-3.367 1.313-4.62 2.755a7.62 7.62 0 0 0-1.22 1.781"/>
                <path d="m8.931 7.813l-5.04.907L3 3.59"/>
            </g>
        </svg>
    </Icon>
)

export const LockIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const UnlockIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 15V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const EditIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.3333 2.66667C11.5083 2.49167 11.7167 2.35417 11.9458 2.2625C12.175 2.17083 12.4208 2.12667 12.6667 2.13333C12.9125 2.14 13.1542 2.1975 13.3775 2.3025C13.6008 2.4075 13.8017 2.5575 13.9667 2.73333C14.1417 2.90833 14.2792 3.11667 14.3708 3.34583C14.4625 3.575 14.5067 3.82083 14.5 4.06667C14.4933 4.3125 14.4358 4.55417 14.3308 4.7775C14.2258 5.00083 14.0758 5.20167 13.9 5.36667L5.06667 14.2L2 15L2.8 11.9333L11.3333 2.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const SaveIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const CancelIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)