import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  StatsIcon,
  ProjectsIcon,
  GuidesIcon,
  ArchiveIcon,
  IconButton,
  CancelIcon,
  MenuIcon
} from '../../../../atoms'
import {
  FloatingButton,
  MenuOverlay,
  MenuContent,
  MenuHeader,
  MenuList,
  MenuItem,
  UserName,
  MenuIconWrapper,
  ProfileSection
} from './MobileFloatingMenu.styles'
import { useAuth } from '../../../../../hooks/useAuth'

export const MobileFloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { logout, username } = useAuth()
  const navigate = useNavigate()

  const handleToggle = () => {
    setIsOpen(!isOpen)
    // Блокируем скролл при открытом меню
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto'
  }

  const handleClose = () => {
    setIsOpen(false)
    document.body.style.overflow = 'auto'
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <FloatingButton onClick={handleToggle} isOpen={isOpen}>
        <MenuIconWrapper>
          {isOpen ? <CancelIcon size={24} /> : <MenuIcon size={24} />}
        </MenuIconWrapper>
      </FloatingButton>

      <MenuOverlay isOpen={isOpen} onClick={handleClose}>
        <MenuContent isOpen={isOpen} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <MenuHeader>
            <ProfileSection>
              <UserName>{username || 'Гость'}</UserName>
              <IconButton type="logout" size={20} onClick={handleLogout} />
            </ProfileSection>
          </MenuHeader>

          <MenuList>
            <MenuItem to="/stats" onClick={handleClose}>
              <StatsIcon size={24} />
              <span>Статистика</span>
            </MenuItem>

            <MenuItem to="/projects" onClick={handleClose}>
              <ProjectsIcon size={24} />
              <span>Мои проекты</span>
            </MenuItem>

            <MenuItem to="/guides" onClick={handleClose}>
              <GuidesIcon size={24} />
              <span>Гайды</span>
            </MenuItem>

            <MenuItem to="/archive" onClick={handleClose}>
              <ArchiveIcon size={24} />
              <span>Архив</span>
            </MenuItem>
          </MenuList>
        </MenuContent>
      </MenuOverlay>
    </>
  )
} 