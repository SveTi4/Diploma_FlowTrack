import { useState, useEffect } from 'react'
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
import {
  Avatar,
  Container,
  NavList,
  NavItem,
  ProfileSection,
  BottomSection,
  BottomNavItem,
  ToggleButton,
  LockButton
} from './Sidebar.styles'

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