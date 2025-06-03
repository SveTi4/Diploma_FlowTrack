import styled, { keyframes } from 'styled-components'

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const getSize = (size: 'small' | 'medium' | 'large' = 'medium') => {
  const sizes = {
    small: '24px',
    medium: '40px',
    large: '56px'
  }
  return sizes[size]
}

export const LoaderWrapper = styled.div<{ fullscreen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ fullscreen }) => fullscreen && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  `}
`

export const SpinnerContainer = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  width: ${({ size }) => getSize(size)};
  height: ${({ size }) => getSize(size)};
  position: relative;
`

export const Spinner = styled.div<{ size?: 'small' | 'medium' | 'large', color?: string }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: ${({ color, theme }) => color || theme.colors.primary};
  animation: ${spin} 1s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
`

export const InnerSpinner = styled(Spinner)`
  width: 75%;
  height: 75%;
  top: 12.5%;
  left: 12.5%;
  animation-duration: 0.8s;
  animation-direction: reverse;
`

export const CoreSpinner = styled(Spinner)`
  width: 50%;
  height: 50%;
  top: 25%;
  left: 25%;
  animation-duration: 0.6s;
` 