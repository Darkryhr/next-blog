import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { UserContext } from '../lib/context';
import { useContext } from 'react';
import { LinkButton } from './styled/shared';
import { BiHome, BiPlus } from 'react-icons/bi';

const Sidebar = () => {
  const { user, username } = useContext(UserContext);
  return (
    <Nav>
      <NavMenu>
        <NavItem>
          <Link href='/' passHref>
            <LinkButton>
              <BiHome size={'28px'} />
            </LinkButton>
          </Link>
        </NavItem>

        {username && (
          <>
            <NavItem>
              <Link href='/admin' passHref>
                <LinkButton>
                  <BiPlus size={'28px'} />
                </LinkButton>
              </Link>
            </NavItem>
            <NavItem>
              <Link href={`/${username}`} passHref>
                <LinkButton>
                  <ImageCustom src={user?.photoURL} alt='avatar' />
                </LinkButton>
              </Link>
            </NavItem>
          </>
        )}

        {!username && (
          <NavItem>
            <Link href='/enter' passHref>
              <LinkButton>Log In</LinkButton>
            </Link>
          </NavItem>
        )}
      </NavMenu>
    </Nav>
  );
};

export default Sidebar;

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary.base};
  width: 70px;
  height: 100vh;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const NavItem = styled.li`
  color: white;
  margin: 1em 0;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ImageCustom = styled.img`
  border-radius: 50px;
  width: 38px;
`;
