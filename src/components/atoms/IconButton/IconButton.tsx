import {InfoIcon, RefreshIcon, TrashIcon, EditIcon, SaveIcon, CancelIcon, LogoutIcon} from '../Icon/icons'
import { StyledButton } from './IconButton.styles'

interface IconButtonProps {
  onClick: (e: React.MouseEvent) => void;
  size?: number;
  type?: 'delete' | 'info' | 'reload' | 'edit' | 'save' | 'cancel' | 'logout';
}

export const IconButton: React.FC<IconButtonProps> = ({ onClick, size = 16, type = 'delete' }) => {
  const getColor = (type: string) => {
    switch (type) {
      case 'delete':
      case 'logout':
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
      case 'logout':
        return <LogoutIcon size={size} />
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