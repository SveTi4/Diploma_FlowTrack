import React from 'react';
import { CheckIcon } from "../Icon/icons.tsx";
import { StatusWrapper, IconWrapper, LoadingSpinner } from './TaskStatus.styles';

interface TaskStatusProps {
  status: boolean;
  onStatusChange: () => void;
  isLoading?: boolean;
}

export const TaskStatus: React.FC<TaskStatusProps> = ({ 
  status, 
  onStatusChange,
  isLoading = false 
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const currentColor = status ? 'green' : 'red';
  const hoverColor = !status ? 'green' : 'red';
  
  return (
    <StatusWrapper
      onClick={onStatusChange}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <IconWrapper isVisible={!isHovered}>
            <CheckIcon size={24} color={currentColor} />
          </IconWrapper>
          <IconWrapper isVisible={isHovered}>
            <CheckIcon size={24} color={hoverColor} />
          </IconWrapper>
        </>
      )}
    </StatusWrapper>
  );
}; 