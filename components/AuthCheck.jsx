import React from 'react';
import NextLink from 'next/link';
import { Link, Flex, Button, Heading } from '@chakra-ui/react';
import { useAuth } from '@lib/auth';

const AuthCheck = props => {
  const auth = useAuth();
  return auth.user
    ? props.children
    : props.fallback || (
        <Flex direction='column' w='full' justify='center' align='center'>
          <Heading color='red.600' fontSize='9xl'>
            !
          </Heading>
          <NextLink href='/enter' passHref>
            <Button colorScheme='red'>You must be signed in</Button>
          </NextLink>
        </Flex>
      );
};

export default AuthCheck;
