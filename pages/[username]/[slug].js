import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import PostContent from '../../components/PostContent';
import AuthCheck from '../../components/AuthCheck';
import HeartButton from '../../components/HeartButton';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from '../../components/styled/shared';

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post, path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());
    path = postRef.path;
  }

  return {
    props: {
      post,
      path,
    },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map(doc => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // paths: [
    //   {
    //     params: {},
    //   },
    // ],
    paths,
    fallback: 'blocking',
  };
}

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;
  return (
    <Container>
      <ContentSection>
        <PostContent post={post} />
      </ContentSection>
      <HeartWrapper>
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>
        <AuthCheck
          fallback={
            <Link href='/enter' passHref>
              <Button>Sign Up</Button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>
      </HeartWrapper>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
`;

const ContentSection = styled.section`
  padding: 1em 0;
`;

const HeartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
