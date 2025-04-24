import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CloseIcon } from '../../atoms/Icon/icons'

const Panel = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-640px')};
  width: 640px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  padding: 0;
  transition: right 0.3s ease;
  overflow-y: auto;
  z-index: 1000;
  border-left: 1px solid ${({ theme }) => theme.colors.border};

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 ${({ theme }) => theme.spacing.large};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
`

const CloseButton = styled.button`
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

interface SidePanelProps {
  isOpen: boolean;
  title: ReactNode;
  onClose: () => void;
  children: React.ReactNode;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  title,
  onClose,
  children
}) => {
  return (
    <Panel isOpen={isOpen}>
      <Header>
        <Title>{title}</Title>
        <CloseButton onClick={onClose}>
          <CloseIcon size={24} />
        </CloseButton>
      </Header>
      <Content>
        {children}
      </Content>
    </Panel>
  )
} 