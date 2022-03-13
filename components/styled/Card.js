import styled from 'styled-components';

export const Card = styled.div`
  display: block;
  background: ${({ theme }) => theme.colors.primary.lighter};
  padding: 2rem;
  margin-bottom: 3rem;
  border-radius: 5px;
  z-index: 0;
`;

export const CardFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
