import {
  LoaderWrapper,
  SpinnerContainer,
  Spinner,
  InnerSpinner,
  CoreSpinner
} from './Loader.styles'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
  fullscreen?: boolean
}

export const Loader = ({ size = 'medium', color, fullscreen = false }: LoaderProps) => {
  return (
    <LoaderWrapper fullscreen={fullscreen}>
      <SpinnerContainer size={size}>
        <Spinner size={size} color={color} />
        <InnerSpinner size={size} color={color} />
        <CoreSpinner size={size} color={color} />
      </SpinnerContainer>
    </LoaderWrapper>
  )
} 