import styled from 'styled-components';

export const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

export const StatusIndicator = styled.div<{ status: 'green' | 'yellow' | 'red' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: ${props => 
    props.status === 'green' ? props.theme.colors.success :
    props.status === 'yellow' ? props.theme.colors.warning :
    props.theme.colors.error
  };
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 500;
`;

export const StatusDetails = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

export const MetricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  font-weight: 500;
`; 