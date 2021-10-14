import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;

const Main = styled.div`
  position: absolute;
  top: 0;
  left: 90px;
  width: calc(100% - 90px);
`;
