import styled, { keyframes } from 'styled-components'

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.surface} 50%,
    ${({ theme }) => theme.colors.background} 100%
  );
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease infinite;
  position: relative;
  overflow: hidden;
  gap: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      transparent 0%,
      ${({ theme }) => theme.colors.background}88 100%
    );
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: radial-gradient(
      circle at center,
      ${({ theme }) => theme.colors.primary}11 0%,
      transparent 50%
    );
    animation: ${floatAnimation} 8s ease-in-out infinite;
    z-index: 0;
  }
`

export const ThemeToggleWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
  padding: 1rem;
  background: ${({ theme }) => `${theme.colors.surface}60`};
  border-radius: 12px;
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.15),
    0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px ${({ theme }) => `${theme.colors.border}30`};
  position: relative;
  z-index: 1;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => `${theme.colors.surface}40`} 0%,
      ${({ theme }) => `${theme.colors.surface}20`} 100%
    );
    z-index: -1;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 20px rgba(0, 0, 0, 0.2),
      0 2px 6px rgba(0, 0, 0, 0.15),
      inset 0 0 0 1px ${({ theme }) => `${theme.colors.border}40`};
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    border-radius: 8px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
` 