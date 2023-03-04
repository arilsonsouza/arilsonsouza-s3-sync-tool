import styled from 'styled-components';

export const BucketsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionContainer = styled.section`
  padding: 1rem;
  background: ${({ theme }) => theme.backgrounds.lighter};
  border-radius: 4px;
`;

export const SyncFolderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
