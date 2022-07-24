import React from 'react';
import PostItem from './PostItem';
import { Box, Flex, VStack } from '@chakra-ui/react';

const PostFeed = ({ posts, admin }) => {
  return (
    <Flex direction='column'>
      {posts
        ? posts.map(post => (
            <PostItem key={post.slug} post={post} admin={admin} />
          ))
        : null}
    </Flex>
  );
};

export default PostFeed;
