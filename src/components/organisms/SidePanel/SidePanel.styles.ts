import styled from 'styled-components'

export const Panel = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 640px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  padding: 0;
  overflow-y: auto;
  z-index: 1000;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out, visibility 0.3s ease-in-out;
  will-change: transform, visibility;

  @media (max-width: 480px) {
    width: 100%;
  }

  /* Стилизация скроллбара */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 ${({ theme }) => theme.spacing.large};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 480px) {
    height: 64px;
    padding: 0 16px;
  }
`

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  width: 100%;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`

export const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};

  @media (max-width: 480px) {
    padding: 16px;
    gap: 16px;
  }
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.small};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
  }
` 