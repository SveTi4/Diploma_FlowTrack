import styled from 'styled-components'
import {InfoIcon, RefreshIcon, TrashIcon, EditIcon, SaveIcon, CancelIcon} from '../Icon/icons'

const StyledButton = styled.button<{ $size?: number, $color: string }>`
  background: none;
  border: none;
  padding: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: all 0.2s ease;
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.small};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    padding: 2px;
    background: ${({ theme, $color }) => $color === 'danger' 
      ? theme.colors.danger 
      : $color === 'warning' 
        ? theme.colors.warning 
        : $color === 'primary'
          ? theme.colors.primary
          : theme.colors.ghost
    };
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    padding: 2px;
    background: ${({ theme, $color }) => $color === 'danger' 
      ? theme.colors.danger 
      : $color === 'warning' 
        ? theme.colors.warning 
        : $color === 'primary'
          ? theme.colors.primary
          : theme.colors.ghost
    };
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    transition: clip-path 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    opacity: 1;
    color: ${({ theme, $color }) => $color === 'danger' 
      ? theme.colors.danger 
      : $color === 'warning' 
        ? theme.colors.warning 
        : $color === 'primary'
          ? theme.colors.primary
          : theme.colors.ghost
    };

    &::after {
      opacity: 1;
      clip-path: polygon(
        0 0,
        100% 0,
        100% 100%,
        0 100%
      );
      animation: drawBorder 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
  }

  @keyframes drawBorder {
    0% {
      clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    }
    25% {
      clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    }
    50% {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
    75% {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
    100% {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }

  svg {
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    stroke: currentColor;
  }
`

interface IconButtonProps {
  onClick: (e: React.MouseEvent) => void;
  size?: number;
  type?: 'delete' | 'info' | 'reload' | 'edit' | 'save' | 'cancel';
}

export const IconButton: React.FC<IconButtonProps> = ({ onClick, size = 16, type = 'delete' }) => {
  const getColor = (type: string) => {
    switch (type) {
      case 'delete':
        return 'danger';
      case 'info':
        return 'warning';
      case 'save':
      case 'edit':
        return 'primary';
      default:
        return 'ghost';
    }
  }

  const renderIcon = () => {
    switch (type) {
      case 'delete':
        return <TrashIcon size={size} />;
      case 'info':
        return <InfoIcon size={size} />;
      case 'reload':
        return <RefreshIcon size={size} />;
      case 'edit':
        return <EditIcon size={size} />;
      case 'save':
        return <SaveIcon size={size} />;
      case 'cancel':
        return <CancelIcon size={size} />;
      default:
        return <InfoIcon size={size} />;
    }
  }

  return (
    <StyledButton onClick={onClick} $size={size} $color={getColor(type)}>
      {renderIcon()}
    </StyledButton>
  )
} 