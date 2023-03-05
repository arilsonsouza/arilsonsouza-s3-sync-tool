import styled from 'styled-components';

export const BucketSyncContainer = styled.div`
  button {
    min-height: 2.39875rem;
  }
`;

export const BucketSyncHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

type ConsoleOutputProps = {
  isOpen: boolean;
};

export const ConsoleOutputContainer = styled.div<ConsoleOutputProps>`
  padding: ${(props) => (props.isOpen ? '0.9375rem' : '0 0.9375rem')};
  background: ${({ theme }) => theme.backgrounds.darkest};
  border: 1px solid ${({ theme }) => theme.colors.purple};
  border-radius: 4px;
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  max-height: ${(props) => (props.isOpen ? '14rem' : '0')};
  min-height: ${(props) => (props.isOpen ? '14rem' : '0')};
  transition: all 0.3s;
  color: ${({ theme }) => theme.colors.purple};
  font-size: 0.8rem;
  overflow-y: auto;
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
`;

export const ProgressBarContainer = styled.div`
  margin-bottom: 0.125rem;
  background: ${({ theme }) => theme.colors.purpleDark};
  border-radius: 4px;
`;

type ProgressBarStatusProps = {
  progress: number;
};

export const ProgressBarStatus = styled.div<ProgressBarStatusProps>`
  width: ${(props) => `${props.progress}%`};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.purple};
  font-size: 0.7rem;
  padding: 0 0.125rem;
  text-align: center;
  transition: all 0.4s;
`;
