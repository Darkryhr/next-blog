import React from 'react';
import Link from 'next/link';
import { Nav, NavItem, NavLogo, Avatar } from './styled/sidebarStyles';
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
      <NavLogo data-tip='Home'>
        <Link href='/' passHref>
          <LinkButton>
            <Image src='/logo.svg' alt='logo' height='36px' width='36px' />
          </LinkButton>
        </Link>
      </NavLogo>

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
                <BiEdit size={28} />
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
                <Avatar src={user?.photoURL} alt='avatar' />
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
    </Nav>
  );
};

export default Sidebar;
