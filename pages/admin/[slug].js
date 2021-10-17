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
            <h1>{post.title}</h1>
            <p>{post.title}</p>
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
  console.log(errors);
  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimeStamp(),
    });

    reset({ content, published });

    toast.success('Post Updated Successfully');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div>
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}
      <div>
        <ImageUploader />
        <textarea
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
        ></textarea>

        {errors.content && <p>{errors.content.message}</p>}

        <fieldset>
          <input type='checkbox' {...register('published')} />
          <label>published</label>
        </fieldset>
        <button type='submit' disabled={!isValid || !isDirty}>
          Save Changes
        </button>
      </div>
    </form>
  );
}
