import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { UserContext } from '../lib/context';
import { useContext } from 'react';
const Sidebar = () => {
  const { user, username } = useContext(UserContext);
  return (
    <Nav>
      <ul>
        <li>
          <Link href='/' passHref>
            <button>Home</button>
          </Link>
        </li>

        {username && (
          <>
            <li>
              <Link href='/admin' passHref>
                <button>Write</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`} passHref>
                <button>user</button>
              </Link>
            </li>
          </>
        )}

        {!username && (
          <li>
            <Link href='/enter' passHref>
              <button>Log In</button>
            </Link>
          </li>
        )}
      </ul>
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
`;
