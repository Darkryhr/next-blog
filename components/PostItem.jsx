import React from 'react';
import {
  Box,
  Heading,
  Flex,
  HStack,
  Link,
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { BiHeart } from 'react-icons/bi';

const PostItem = ({ post }) => {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  return (
    <LinkBox
      as='article'
      borderWidth='1px'
      borderRadius='lg'
      bg='gray.100'
      borderColor='gray.300'
      w='full'
      px={6}
      py={5}
      mb={4}
    >
      <NextLink href={`/${post.username}`} passHref>
        <Link fontWeight='semibold' fontSize='sm' color='gray.600'>
          {post.username}
        </Link>
      </NextLink>
      <NextLink href={`/${post.username}/${post.slug}`} passHref>
        <LinkOverlay>
          <Heading mt={1}>{post.title}</Heading>
        </LinkOverlay>
      </NextLink>

      <Flex justifyContent='space-between' mt={3}>
        <HStack>
          <Box>
            <BiHeart size={'20'} />
          </Box>
          <Box fontSize='sm'>{post.heartCount || 0} Likes</Box>
        </HStack>
        <Box color='gray.600' fontWeight='s' letterSpacing='wide' fontSize='sm'>
          {minutesToRead} min read
        </Box>
      </Flex>
    </LinkBox>
  );
};

export default PostItem;
