import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { UserContext } from '../lib/context';
import { useContext } from 'react';
import { LinkButton } from './styled/shared';
import { BiEdit, BiLogOut, BiLogIn } from 'react-icons/bi';
import Image from 'next/image';
import ReactTooltip from 'react-tooltip';

const Sidebar = () => {
  const { user, username } = useContext(UserContext);
  return (
    <Nav>
      <NavMenu>
        <NavItem data-tip='Home'>
          <Link href='/' passHref>
            <LinkButton>
              <Image src='/logo.svg' alt='logo' height='35px' width='35px' />
            </LinkButton>
          </Link>
        </NavItem>

        {username && (
          <>
            <NavItem data-tip='Manage Posts'>
              {/* <ReactTooltip
                className='tooltip'
                place='right'
                type='dark'
                effect='solid'
              /> */}

              <Link href='/admin' passHref>
                <LinkButton>
                  <BiEdit size={'28px'} />
                </LinkButton>
              </Link>
            </NavItem>
            <NavItem data-tip='Log Out'>
              <Link href='/enter' passHref>
                <LinkButton>
                  <BiLogOut size={'28px'} />
                </LinkButton>
              </Link>
            </NavItem>
            <NavItem data-tip='Profile'>
              {/* <ReactTooltip
                className='tooltip'
                place='right'
                type='dark'
                effect='solid'
              /> */}

              <Link href={`/${username}`} passHref>
                <LinkButton>
                  <ImageCustom src={user?.photoURL} alt='avatar' />
                </LinkButton>
              </Link>
            </NavItem>
          </>
        )}

        {!username && (
          <NavItem data-tip='Log In'>
            {/* <ReactTooltip
              className='tooltip'
              place='right'
              type='dark'
              effect='solid'
            /> */}

            <Link href='/enter' passHref>
              <LinkButton>
                <BiLogIn size={'28px'} />
              </LinkButton>
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
  z-index: 99;
`;

const NavMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 0.5em;
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
