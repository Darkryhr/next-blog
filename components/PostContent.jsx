import React from 'react';
import NextLink from 'next/link';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import styles from '../styles/markdown.module.css';

const PostContent = ({ post }) => {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt.toDate();
  return (
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
        <NextLink href={`/${post.username}/`} passHref>
          <Link color='gray.600' fontWeight='semibold'>
            {post.username}
          </Link>
        </NextLink>{' '}
        <Text color='gray.500' fontSize='sm'>
          <time dateTime={createdAt}>
            Posted on {format(createdAt, 'MMMM do')}
          </time>
        </Text>
      </Flex>
      <Heading color='gray.700' fontSize='6xl'>
        {post.title}
      </Heading>

      <Box mt={4} py={3} minH='4xl'>
        <div className={styles.markdown}>
          <ReactMarkdown>{post?.content}</ReactMarkdown>
        </div>
      </Box>
    </Box>
  );
};

export default PostContent;
