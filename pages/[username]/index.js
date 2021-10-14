import React from 'react';
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';

export async function getServerSideProps({ query }) {
  const username = query;
  return {
    props: {
      user,
      posts,
    },
  };
}

const UserProfilePage = ({ user, posts }) => {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
};

export default UserProfilePage;
