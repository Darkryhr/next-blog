import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

const PostContent = ({ post }) => {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt.toDate();
  return (
    <div>
      <h1>{post.title}</h1>
      <span>
        Written ny{' '}
        <Link href={`/${post.username}/`}>
          <a>@{post.username}</a>
        </Link>
        on {createdAt.toISOString()}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
};

export default PostContent;