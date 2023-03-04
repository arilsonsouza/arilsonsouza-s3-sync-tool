import styled from 'styled-components';

export const BucketStatsContainer = styled.div`
  min-height: 6.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  line-height: 130%;
`;

export const BucketInfoContainer = styled.div`
  flex: 1;
`;

export const BucketInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  strong {
    font-weight: 400;
    font-size: 1.1rem;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem;
    border-radius: 4px;
    background: transparent;
    color: ${({ theme }) => theme.colors.purple};
    transition: all 0.2s;

    :disabled {
      color: ${({ theme }) => theme.colors.purpleDark};
      cursor: not-allowed;
    }
    :not(:disabled):hover {
      background-color: ${({ theme }) => theme.backgrounds.lightest};
    }
  }
`;

export const BucketInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BucketStatsItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span {
    font-size: 2rem;
    display: flex;
    margin-top: -0.8rem;
    color: ${({ theme }) => theme.colors.purple};
  }

  strong {
    font-weight: 400;
  }
`;
