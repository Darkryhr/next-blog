import { Box, Container } from '@chakra-ui/react';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <Box bg='gray.200'>
      <Box maxW='container.xl' mx='auto' minH='calc(100vh)'>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
