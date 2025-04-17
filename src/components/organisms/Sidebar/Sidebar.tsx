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
  width: ${({ isCollapsed }) => isCollapsed ? '84px' : '240px'};
  height: 100vh;
  background: #121316;
  transition: all 0.3s ease;
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
  height: 80px;
  margin: 0;
  border-radius: 0;
  padding: 0 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  ${Avatar} {
    opacity: 1;
    min-width: 24px;
  }

  span:not(${StyledIcon}) {
    opacity: ${({ isCollapsed }) => isCollapsed ? 0 : 1};
  }
`

const BottomSection = styled.div`
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`

const BottomNavItem = styled(NavItem)`
  margin-bottom: 8px;
`

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  width: 40px;
  height: 64px;
  background: #121316;
  //border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  //color: rgba(255, 255, 255, 1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 12px;
  
  //&:hover {
  //  background: rgba(255, 255, 255, 0.1);
  //}
`

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <Container isCollapsed={isCollapsed}>
      <ProfileSection to="/profile" isCollapsed={isCollapsed}>
        <Avatar />
        <span>Username</span>
      </ProfileSection>
      <NavList>
        <NavItem to="/stats" isCollapsed={isCollapsed}>
          <Icon name="stats" size={20} />
          <span>Статистика</span>
        </NavItem>
        
        <NavItem to="/projects" isCollapsed={isCollapsed}>
          <Icon name="projects" size={20} />
          <span>Мои проекты</span>
        </NavItem>
        
        <NavItem to="/guides" isCollapsed={isCollapsed}>
          <Icon name="guides" size={20} />
          <span>Гайды</span>
        </NavItem>
        
        <NavItem to="/notifications" isCollapsed={isCollapsed}>
          <Icon name="notifications" size={20} />
          <span>Уведомления</span>
        </NavItem>
      </NavList>

      <BottomSection>
        <BottomNavItem to="/archive" isCollapsed={isCollapsed}>
          <Icon name="archive" size={20} />
          <span>Архив</span>
        </BottomNavItem>
        
        <BottomNavItem to="/support" isCollapsed={isCollapsed}>
          <Icon name="support" size={20} />
          <span>Поддержка</span>
        </BottomNavItem>
      </BottomSection>

      <ToggleButton onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ?
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.7">
                      <path d="M14.625 11.25L21.375 18L14.625 24.75" stroke="white" stroke-linecap="round"
                            stroke-linejoin="round"/>
                  </g>
              </svg> :
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.7">
                      <path d="M21.375 24.75L14.625 18L21.375 11.25" stroke="white" stroke-linecap="round"
                            stroke-linejoin="round"/>
                  </g>
              </svg>
          }
      </ToggleButton>
    </Container>
  )
} 