import { postToJSON } from '@lib/firebase';
import React from 'react';
import UserProfile from '@components/UserProfile';
import { getUser, getUserPosts } from '@lib/db';
import PostFeed from '@components/PostFeed';
import { Box } from '@chakra-ui/react';

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUser(username);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  const user = userDoc.data();

  const posts = (await getUserPosts(userDoc.ref.id)).posts.map(postToJSON);

  return {
    props: {
      user,
      posts,
    },
  };
}

const UserProfilePage = ({ user, posts }) => {
  return (
    <Box as='main' maxW='container.lg' mx='auto' minH='calc(100vh)'>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </Box>
  );
};

export default UserProfilePage;
