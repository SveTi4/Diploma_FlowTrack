import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  StatsIcon, 
  ProjectsIcon, 
  GuidesIcon, 
  NotificationsIcon, 
  ArchiveIcon, 
  SupportIcon,
  LockIcon,
  UnlockIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '../../atoms/Icon/icons'

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
`

const Container = styled.div<{ isCollapsed: boolean }>`
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

const NavList = styled.div`
  padding: 32px 16px;
  flex: 1;
`

const NavItem = styled(NavLink)<{ isCollapsed?: boolean }>`
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

const ProfileSection = styled(NavItem)`
  height: 80px;
  margin: 0;
  border-radius: 0;
  padding: 0 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${Avatar} {
    opacity: 1;
    min-width: 24px;
  }

  span {
    opacity: ${({ isCollapsed }) => isCollapsed ? 0 : 1};
  }
`

const BottomSection = styled.div`
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const BottomNavItem = styled(NavItem)`
  margin-bottom: 8px;
`

const ToggleButton = styled.button<{ isVisible: boolean }>`
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

const LockButton = styled.button<{ isCollapsed?: boolean; isLocked?: boolean }>`
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

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLocked, setIsLocked] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isLocked) {
      setIsCollapsed(!isHovered)
    }
  }, [isHovered, isLocked])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Container 
      isCollapsed={isCollapsed}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ProfileSection to="/profile" isCollapsed={isCollapsed}>
        <Avatar />
        <span>Username</span>
      </ProfileSection>
      
      <NavList>
        <NavItem to="/stats" isCollapsed={isCollapsed}>
          <StatsIcon size={20} />
          <span>Статистика</span>
        </NavItem>
        
        <NavItem to="/projects" isCollapsed={isCollapsed}>
          <ProjectsIcon size={20} />
          <span>Мои проекты</span>
        </NavItem>
        
        <NavItem to="/guides" isCollapsed={isCollapsed}>
          <GuidesIcon size={20} />
          <span>Гайды</span>
        </NavItem>
        
        <NavItem to="/notifications" isCollapsed={isCollapsed}>
          <NotificationsIcon size={20} />
          <span>Уведомления</span>
        </NavItem>
      </NavList>

      <BottomSection>
        <LockButton 
          onClick={() => setIsLocked(!isLocked)}
          isCollapsed={isCollapsed}
          isLocked={isLocked}
        >
          {isLocked ? <LockIcon size={20} /> : <UnlockIcon size={20} />}
          <span className="text">Зафиксировать</span>
        </LockButton>
        
        <BottomNavItem to="/archive" isCollapsed={isCollapsed}>
          <ArchiveIcon size={20} />
          <span>Архив</span>
        </BottomNavItem>
        
        <BottomNavItem to="/support" isCollapsed={isCollapsed}>
          <SupportIcon size={20} />
          <span>Поддержка</span>
        </BottomNavItem>
      </BottomSection>

      <ToggleButton 
        onClick={() => isLocked && setIsCollapsed(!isCollapsed)}
        isVisible={isLocked}
      >
        {isCollapsed ? (
          <ArrowLeftIcon size={16} />
        ) : (
          <ArrowRightIcon size={16} />
        )}
      </ToggleButton>
    </Container>
  )
} 