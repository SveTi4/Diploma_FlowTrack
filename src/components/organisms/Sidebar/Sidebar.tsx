import styled from 'styled-components'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, StyledIcon } from '../../atoms/Icon/Icon'

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
`

const Container = styled.div<{ isCollapsed: boolean }>`
  position: relative;
  width: ${({ isCollapsed }) => isCollapsed ? '60px' : '240px'};
  height: 100vh;
  background: #1C1C1E;
  transition: all 0.3s ease;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
`

const NavList = styled.div`
  padding: 8px;
  flex: 1;
`

const NavItem = styled(NavLink)<{ isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 14px;
  border-radius: 6px;
  margin-bottom: 4px;
  white-space: nowrap;

  span:last-child {
    opacity: ${({ isCollapsed }) => isCollapsed ? 0 : 1};
    transition: opacity 0.2s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
`

const ProfileSection = styled(NavItem)`
  margin-bottom: 16px;

  ${Avatar} {
    opacity: 1;
    min-width: 24px;
  }

  span:not(${StyledIcon}) {
    opacity: ${({ isCollapsed }) => isCollapsed ? 0 : 1};
  }
`

const BottomSection = styled.div`
  padding: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: -12px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: #1C1C1E;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 12px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <Container isCollapsed={isCollapsed}>
      <NavList>
        <ProfileSection to="/profile" isCollapsed={isCollapsed}>
          <Avatar />
          <span>Username</span>
        </ProfileSection>

        <NavItem to="/stats" isCollapsed={isCollapsed}>
          <Icon name="stats" />
          <span>Статистика</span>
        </NavItem>
        
        <NavItem to="/projects" isCollapsed={isCollapsed}>
          <Icon name="projects" />
          <span>Мои проекты</span>
        </NavItem>
        
        <NavItem to="/guides" isCollapsed={isCollapsed}>
          <Icon name="guides" />
          <span>Гайды</span>
        </NavItem>
        
        <NavItem to="/notifications" isCollapsed={isCollapsed}>
          <Icon name="notifications" />
          <span>Уведомления</span>
        </NavItem>
      </NavList>

      <BottomSection>
        <NavItem to="/archive" isCollapsed={isCollapsed}>
          <Icon name="archive" />
          <span>Архив</span>
        </NavItem>
        
        <NavItem to="/support" isCollapsed={isCollapsed}>
          <Icon name="support" />
          <span>Поддержка</span>
        </NavItem>
      </BottomSection>

      <ToggleButton onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? '→' : '←'}
      </ToggleButton>
    </Container>
  )
} 