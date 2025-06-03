import styled from 'styled-components'

export const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px 16px;
  color: #fff;
  font-size: 14px;
  width: 280px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
` 