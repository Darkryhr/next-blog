import { Box, Flex, Text, Heading, Link, Skeleton } from '@chakra-ui/react';

export default function SkeletonPost() {
  return (
    <Box
      w='full'
      maxW={{
        base: 'none',
        sm: 'container.lg',
      }}
    >
      <Box
        bg='white'
        borderWidth={1}
        borderColor='gray.300'
        borderRadius={{
          base: 0,
          md: 'md',
        }}
        px={12}
        py={6}
        w='full'
      >
        <Flex direction='column' mb={4}>
          <Link color='gray.600' fontWeight='semibold'>
            <Skeleton height={5} mb={2} w={36} />
          </Link>{' '}
          <Text color='gray.500' fontSize='sm'>
            <Skeleton height={4} mb={2} w={20} />
          </Text>
        </Flex>
        <Heading color='gray.700' fontSize='5xl'>
          <Skeleton height={10} w='sm' />
        </Heading>

        <Box mt={4} py={3} minH='4xl'>
          <Skeleton height={6} my={4} w='2xl' />
          <Skeleton height={6} my={4} w='4xl' />
          <Skeleton height={6} my={4} w='4xl' />
          <Skeleton height={6} my={4} w='3xl' />
          <Skeleton height={6} my={4} w='xl' />
        </Box>
      </Box>
    </Box>
  );
}
