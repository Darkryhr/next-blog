import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import toast from 'react-hot-toast';
import AuthCheck from '../../components/AuthCheck';
import { auth, firestore, serverTimeStamp } from '../../lib/firebase';
import ImageUploader from '../../components/ImageUploader';
import { Title, Subtitle, StrokedButton } from '../../components/styled/shared';
import styled from 'styled-components';

const AdminEditPage = () => {
  return (
    <main>
      <AuthCheck>
        <PostManager />
      </AuthCheck>
    </main>
  );
};

export default AdminEditPage;

function PostManager() {
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  const postRef = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts')
    .doc(slug);

  const [post] = useDocumentDataOnce(postRef);

  return (
    <main>
      {post && (
        <>
          <section>
            <Title>{post.title}</Title>
            <Subtitle>ID: {post.slug}</Subtitle>
            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>
          <aside></aside>
        </>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const { isValid, isDirty, errors } = formState;
  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimeStamp(),
    });

    reset({ content, published });

    toast.success('Post Updated Successfully', {
      style: {
        fontFamily: 'Rubik',
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div>
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}
      <div>
        <ImageUploader />
        <TextArea
          {...register('content', {
            maxLength: {
              value: 20000,
              message: 'Content is too long',
            },
            minLength: {
              value: 10,
              message: 'Content is too short',
            },
            required: {
              value: true,
              message: 'Content is required',
            },
          })}
        ></TextArea>

        {errors.content && <p>{errors.content.message}</p>}

        <CheckBoxWrapper>
          <CheckBox id='checkbox' type='checkbox' {...register('published')} />

          {/* <input type='checkbox' {...register('published')} /> */}
          <CheckBoxLabel htmlFor='checkbox' />
          <label>Published</label>
        </CheckBoxWrapper>
        <StrokedButton type='submit' disabled={!isValid || !isDirty}>
          Save Changes
        </StrokedButton>
      </div>
    </Form>
  );
}

const CheckBoxWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 1em;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 4px;
    background: #ffffff;
    transition: 0.3s all;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  cursor: pointer;
  &:checked + ${CheckBoxLabel} {
    background: ${({ theme }) => theme.colors.accent.base};
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

const Form = styled.form`
  width: 80%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 30vh;
  color: black;
  border-radius: 8px;
`;
