import React, { ReactNode } from 'react'
import { CloseIcon } from '../../atoms/Icon/icons.tsx'
import {
  Panel,
  Header,
  Title,
  Content,
  CloseButton
} from './SidePanel.styles'

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