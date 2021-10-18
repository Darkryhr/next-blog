import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Main>
        {children}
        {/* <Footer /> */}
      </Main>
    </>
  );
};

export default Layout;

const Main = styled.div`
  position: absolute;
  top: 0;
  left: 70px;
  width: calc(100% - 70px);
  padding: 1rem 5vw;
`;
