import { useState } from 'react';
import { postToJSON } from '../lib/firebase';
import PostFeed from '../components/PostFeed';
import {
  getFollowingPublishedPosts,
  getInitialPublishedPosts,
  fromMillis,
} from '../lib/db';
import { _LIMIT } from '../constants';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { LogoIcon } from '@components/Logo';

export async function getServerSideProps(context) {
  const posts = (await getInitialPublishedPosts()).posts.map(postToJSON);
  return {
    props: {
      posts,
    },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === 'number'
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const newPosts = (await getFollowingPublishedPosts(cursor)).posts.map(
      postToJSON
    );

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < _LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <Flex
      direction='column'
      pt={6}
      pb={10}
      maxW='container.lg'
      w='full'
      mx='auto'
      px={{
        base: 8,
        lg: 0,
      }}
    >
      <Flex direction='column' justify='center' align='center'>
        <Box>
          <Heading>
            Welcome to
            <LogoIcon display='inline' w='16' h='12' ml={3} mb={2} />
          </Heading>
        </Box>
        <Box>
          <Text mb={6} color='gray.600'>
            Feel free to browse or write something
          </Text>
        </Box>
      </Flex>
      <PostFeed posts={posts} />
      {!loading && !postsEnd && (
        <Button
          onClick={getMorePosts}
          backgroundColor='gray.900'
          color='white'
          fontWeight='medium'
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)',
          }}
        >
          Load More
        </Button>
      )}
      {postsEnd && (
        <Flex align='center' justify='center' mt={5}>
          <Heading color='gray.700' fontSize='xl'>
            You have reached the end!
          </Heading>
        </Flex>
      )}
    </Flex>
  );
}
