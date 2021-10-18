import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loader = ({ show }) => {
  return show ? <Spinner /> : null;
};

export default Loader;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid ${({ theme }) => theme.colors.accent.base};
  border-right: 2px solid ${({ theme }) => theme.colors.accent.base};
  border-bottom: 2px solid ${({ theme }) => theme.colors.accent.base};
  border-left: 4px solid black;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;
