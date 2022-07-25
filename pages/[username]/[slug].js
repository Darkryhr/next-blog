import { Box, Button, Flex, Text } from '@chakra-ui/react';
import PostContent from '@components/PostContent';
import { getAllPostsSnapshot, getPostRef, getUser, getUserPost } from '@lib/db';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import HeartButton from '@components/HeartButton';
import AuthCheck from '@components/AuthCheck';

import NextLink from 'next/link';
import { useAuth } from '@lib/auth';
import { AiFillHeart } from 'react-icons/ai';
import SkeletonPost from '@components/SkeletonPost';
export async function getStaticPaths() {
  const snapshot = await getAllPostsSnapshot();

  const paths = snapshot.docs.map(doc => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUser(username);

  if (!userDoc) return;

  const { post, path } = await getUserPost(userDoc.ref.id, slug);

  return {
    props: {
      post,
      path,
    },
    revalidate: 5000,
  };
}

export default function Post(props) {
  const postRef = getPostRef(props.path);
  const [realtimePost, loading] = useDocumentData(postRef);
  const auth = useAuth();

  const post = realtimePost || props.post;

  if (loading) return <SkeletonPost />;
  return (
    <Flex
      pt={{
        base: 0,
        md: 8,
      }}
      justify='center'
      px={{
        base: 0,
        md: 4,
      }}
      direction={{
        base: 'column-reverse',
        md: 'row',
      }}
      pb={{
        base: 0,
        md: 12,
      }}
    >
      <Flex
        direction='column'
        align='center'
        justify='start'
        pr={2}
        py={{
          base: 4,
          md: 2,
        }}
      >
        <AuthCheck
          fallback={
            <NextLink href='/login'>
              <Button leftIcon={<AiFillHeart />}>Sign Up</Button>
            </NextLink>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>
        <Text fontSize='lg' fontWeight='semibold' mt={2}>
          {post.heartCount || 0}
        </Text>

        {auth?.user?.uid === post.uid && (
          <NextLink href={`/account/${post.slug}`}>
            <Button>Edit Post</Button>
          </NextLink>
        )}
      </Flex>
      <Box
        w='full'
        maxW={{
          base: 'none',
          sm: 'container.lg',
        }}
      >
        {loading ? <SkeletonPost /> : <PostContent post={post} />}
      </Box>
    </Flex>
  );
}
