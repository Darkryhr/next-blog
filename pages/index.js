import { useState } from 'react';
import { firestore, postToJSON, fromMillis } from '../lib/firebase';
import PostFeed from '../components/PostFeed';
import Loader from '../components/Loader';
import { Button } from '../components/styled/shared';

// max post to query per page
const _LIMIT = 1;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(_LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  // console.log(posts);

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

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(_LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < _LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <PostFeed posts={posts} />
      {!loading && !postsEnd && (
        <Button onClick={getMorePosts}>Load More</Button>
      )}
      <Loader show={loading} />
      {postsEnd && 'You have reached the end!'}
    </main>
  );
}
