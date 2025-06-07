import styled from 'styled-components';

export const ProgressContainer = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

export const StatusIndicator = styled.div<{ status: 'green' | 'yellow' | 'red' }>`
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  color: white;
  background-color: ${props => 
    props.status === 'green' ? '#4caf50' :
    props.status === 'yellow' ? '#ff9800' : '#f44336'
  };
  margin-bottom: 16px;
  display: inline-block;
  font-size: 14px;
`;

export const StatusDetails = styled.div`
  margin-top: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`;

export const MetricsContainer = styled.div`
  margin-top: 16px;
  font-size: 14px;
  
  p {
    margin: 8px 0;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 13px;
  margin-top: 8px;
`; 