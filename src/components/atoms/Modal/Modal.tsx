import { useEffect } from 'react'
import styled from 'styled-components'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${({ isOpen }) => (isOpen ? 'fadeIn' : 'fadeOut')} 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`

const ModalContainer = styled.div<{ isOpen: boolean }>`
  background: ${({ theme }) => theme.colors.sidebar_bg};
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${({ isOpen }) => (isOpen ? 'slideIn' : 'slideOut')} 0.2s ease-in-out;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-20px);
      opacity: 0;
    }
  }
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.light};
  font-size: 20px;
  font-weight: 500;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 20px;
    height: 20px;
    stroke: ${({ theme }) => theme.colors.light};
  }
`

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CloseButton>
        </ModalHeader>
        {children}
      </ModalContainer>
    </Overlay>
  )
} 