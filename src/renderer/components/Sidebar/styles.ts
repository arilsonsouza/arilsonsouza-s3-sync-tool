import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  height: 100%;
  background: ${({ theme }) => theme.backgrounds.dark};
`;

export const SidebarItem = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  padding: 1.5rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.purple};
  transition: all 0.2s;

  span {
    font-size: 0.9rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.backgrounds.lighter};
  }
`;
