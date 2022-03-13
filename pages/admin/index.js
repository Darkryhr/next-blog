import React, { useContext, useState } from 'react';
import AuthCheck from '../../components/AuthCheck';
import PostFeed from '../../components/PostFeed';
import { UserContext } from '../../lib/context';
import { firestore, auth, serverTimeStamp } from '../../lib/firebase';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { StrokedButton, Heading1 } from '../../components/styled/shared';

const AdminPostsPage = () => {
  return (
    <main>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
};

export default AdminPostsPage;

function PostList() {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map(doc => doc.data());

  return (
    <>
      <Heading1>Manage Posts</Heading1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  // ensure url is safe
  const slug = encodeURI(kebabCase(title));

  //Validate length
  const isValid = title.length > 3 && title.length < 100;

  const createPost = async e => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('posts')
      .doc(slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: '# hello world',
      createdAt: serverTimeStamp(),
      updatedAt: serverTimeStamp(),
      heartCount: 0,
    };

    await ref.set(data);

    toast.success('Post Created!', {
      style: {
        fontFamily: 'Rubik',
      },
    });

    router.push(`/admin/${slug}`);
  };

  return (
    <Form onSubmit={createPost}>
      <InputContainer>
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='No Clickbait please'
        />
      </InputContainer>
      <StrokedButton type='submit' disabled={!isValid}>
        Create
      </StrokedButton>
    </Form>
  );
}

const Input = styled.input`
  width: 98%;
  border: none;
  outline: none;
  color: black;
  font-size: 0.9em;
`;

const InputContainer = styled.div`
  width: 90%;
  height: 40px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-right: 20px;
  padding: 0 1em;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
