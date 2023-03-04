import styled from 'styled-components';

export const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.2rem 0.5rem;

  border-radius: 4px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.purple};
  font-weight: 600;
  transition: all 0.2s;

  :disabled {
    color: ${({ theme }) => theme.colors.opaque};
    background: ${({ theme }) => theme.colors.purpleDark};
    cursor: not-allowed;
  }

  :not(:disabled):hover {
    opacity: 0.8;
  }
`;
