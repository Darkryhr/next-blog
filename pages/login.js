import React from 'react';
import { useAuth } from '../lib/auth';
import { Stack, Button, Icon, Heading, Flex } from '@chakra-ui/react';

const EnterPage = () => {
  const auth = useAuth();

  return (
    <Flex
      direction='column'
      align='center'
      justifyContent='center'
      p={6}
      maxW='container.lg'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      minH='xs'
      mx='auto'
    >
      <Heading>Welcome Aboard</Heading>
      <Stack align='center' mt={4}>
        <Button
          onClick={e => auth.signinWithGitHub()}
          backgroundColor='gray.900'
          color='white'
          w='md'
          fontWeight='medium'
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)',
          }}
        >
          <Icon size='32px' mr={3}>
            <g
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
            </g>
          </Icon>
          Sign In w/ Github
        </Button>
        <Button
          onClick={e => auth.signinWithGoogle()}
          backgroundColor='white'
          color='gray.900'
          variant='outline'
          fontWeight='medium'
          w='md'
          _hover={{ bg: 'gray.100' }}
          _active={{
            bg: 'gray.100',
            transform: 'scale(0.95)',
          }}
        >
          <Icon size='32px' mr={3} viewBox='0 0 533.5 544.3'>
            <g>
              <path
                d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
                fill='#4285f4'
              />
              <path
                d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
                fill='#34a853'
              />
              <path
                d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
                fill='#fbbc04'
              />
              <path
                d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
                fill='#ea4335'
              />
            </g>
          </Icon>
          Sign In w/ Google
        </Button>
      </Stack>
    </Flex>
  );
};

export default EnterPage;
