import styled from 'styled-components';

export const Card = styled.div`
  display: block;
  background: ${({ theme }) => theme.colors.primary.lighter};
  padding: 2em 2em;
  margin-top: 1em;
  margin-bottom: 2em;
  z-index: 0;
`;

export const CardFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-top: 1em; */
`;

export const AsideCard = styled.aside``;
