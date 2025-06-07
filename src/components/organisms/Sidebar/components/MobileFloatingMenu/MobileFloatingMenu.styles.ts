import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const floatingButtonSize = '56px'

export const FloatingButton = styled.button<{ isOpen: boolean }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: ${floatingButtonSize};
  height: ${floatingButtonSize};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.surface};

  &:hover {
    transform: scale(1.05);
  }

  ${({ isOpen }) => isOpen && css`
    transform: rotate(180deg);
  `}
`

export const MenuOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;

  ${({ isOpen }) => isOpen && css`
    opacity: 1;
    visibility: visible;
  `}
`

export const MenuContent = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  max-width: 320px;
  background: ${({ theme }) => theme.colors.background};
  padding: 24px;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;

  ${({ isOpen }) => isOpen && css`
    transform: translateX(0);
  `}
`

export const MenuHeader = styled.div`
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`

export const UserName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundHover};
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const MenuIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
` 