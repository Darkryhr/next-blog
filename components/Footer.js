import React from 'react';
import styled from 'styled-components';
import { Info } from './styled/shared';

const Footer = () => {
  return (
    <FooterWrapper>
      <Info>&copy; Gabriel Lellouche</Info>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary.darker};
`;
