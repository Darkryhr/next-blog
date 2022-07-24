import React, { useState } from 'react';
import AuthCheck from '@components/AuthCheck';
import PostFeed from '@components/PostFeed';
import { serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import { createUserPost, getUserPostsQuery } from '@lib/db';
import { useAuth } from '@lib/auth';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  Flex,
} from '@chakra-ui/react';
import UserProfile from '@components/UserProfile';

const AdminPostsPage = () => {
  const auth = useAuth();
  return (
    <Box
      as='main'
      maxW='container.lg'
      mx='auto'
      px={{
        base: 8,
        md: 0,
      }}
    >
      <AuthCheck>
        <Flex
          justify='space-around'
          align='center'
          direction={{
            base: 'column-reverse',
          }}
        >
          {/* <Flex flex={1} w='full'>
            <CreateNewPost />
          </Flex> */}
          <Flex justify='center' w='full'>
            <UserProfile user={auth.user} admin />
          </Flex>
        </Flex>
        <Divider />
        <PostList />
      </AuthCheck>
    </Box>
  );
};

export default AdminPostsPage;

function PostList() {
  const auth = useAuth();
  const query = getUserPostsQuery(auth.user.uid);
  const [snapshot] = useCollection(query);

  const posts = snapshot?.docs.map(doc => doc.data());
  return (
    <Box mt={6}>
      <Heading mb={4}>Manage Posts</Heading>
      <PostFeed posts={posts} admin />
    </Box>
  );
}

export function CreateNewPost() {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState('');

  // ensure url is safe
  const slug = encodeURI(kebabCase(title));

  //Validate length
  const isValid = title.length > 3 && title.length < 100;

  const createPost = async e => {
    e.preventDefault();
    const uid = user.uid;

    const data = {
      title,
      slug,
      uid,
      username: user.username,
      userPhoto: user.photoURL,
      published: false,
      content: '# hello world',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await createUserPost(uid, slug, data);

    router.push(`/account/${slug}`);
  };

  return (
    <Box as='form' onSubmit={createPost} pb={4} w='full' maxW='xl'>
      <FormControl>
        {/* <FormLabel fontSize='2xl' fontWeight='bold' color='gray.800'>
          Create a new post
        </FormLabel> */}
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          variant='filled'
        />
        <FormHelperText>No Clickbait please</FormHelperText>
        <Button type='submit' disabled={!isValid} mt={2} colorScheme='purple'>
          Create
        </Button>
      </FormControl>
    </Box>
  );
}
