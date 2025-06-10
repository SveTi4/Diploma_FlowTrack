import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
`

export const Container = styled.div<{ isCollapsed: boolean }>`
  z-index: 100;
  position: relative;
  width: ${({ isCollapsed }) => isCollapsed ? '84px' : '240px'};
  height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
`

export const NavList = styled.div`
  padding: 32px 16px;
  flex: 1;
`

export const NavItem = styled(NavLink)<{ isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #A5A5A7;
  text-decoration: none;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  border-radius: 8px;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
    
  span:last-child {
    opacity: ${({ isCollapsed }) => isCollapsed ? 0 : 1};
    transition: opacity 0.2s ease;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundHover};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.backgroundHover};
  }
`

export const ProfileSection = styled.div<{ isCollapsed?: boolean }>`
  height: 80px;
  margin: 0;
  padding: 0 ${({ isCollapsed }) => isCollapsed ? '32px' : '32px'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: ${({ isCollapsed }) => isCollapsed ? 'center' : 'space-between'};
`

export const UserName = styled.div<{ isCollapsed?: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  opacity: ${({ isCollapsed }) => isCollapsed ? 0 : 1};
  transition: opacity 0.2s ease;
  width: ${({ isCollapsed }) => isCollapsed ? '0' : 'auto'};
  overflow: hidden;
  white-space: nowrap;
`

export const BottomSection = styled.div`
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const BottomNavItem = styled(NavItem)`
  margin-bottom: 8px;
`

export const ToggleButton = styled.button<{ isVisible: boolean }>`
  position: absolute;
  top: 50%;
  right: -12px;
  transform: translateY(-50%);
  width: 24px;
  height: 48px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 0 12px 12px 0;
  cursor: pointer;
  display: ${({ isVisible }) => isVisible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: none;
  transition: all 0.2s ease;
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    width: 28px;
  }

  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const LockButton = styled.button<{ isCollapsed?: boolean; isLocked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  color: ${({ theme, isLocked }) => isLocked ? theme.colors.primary : '#A5A5A7'};
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  transition: color 0.2s ease, background-color 0.2s ease;

  .text {
    opacity: ${({ isCollapsed }) => isCollapsed ? 0 : 1};
    transition: opacity 0.2s ease;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundHover};
    color: ${({ theme }) => theme.colors.primary};
  }
` 