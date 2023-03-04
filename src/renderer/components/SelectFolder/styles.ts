import styled from 'styled-components';

export const SelectFolderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.4rem;

  span {
    display: flex;
    align-items: flex-end;
    font-size: 0.9rem;
    svg {
      color: ${({ theme }) => theme.colors.purple};
    }
  }
`;
