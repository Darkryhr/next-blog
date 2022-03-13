import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary.base};
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NavLogo = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.lighter};
`;

export const NavItem = styled.div`
  padding: 1rem;
`;

export const Avatar = styled.img`
  border-radius: 24px;
  width: 2.5rem;
  height: 2.5rem;
`;
