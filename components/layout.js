import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <Main>
      <Sidebar />
      <Content>
        {children}
        {/* <Footer /> */}
      </Content>
    </Main>
  );
};

export default Layout;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem 3vw;
`;

const Main = styled.main`
  display: flex;
  height: 100vh;
`;
