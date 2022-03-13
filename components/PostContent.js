import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Subtitle, Title } from './styled/shared';
import { parseISO, format } from 'date-fns';

const PostContent = ({ post }) => {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <>
      <Title>{post.title}</Title>
      <Subtitle>
        Written by{' '}
        <Link href={`/${post.username}/`} passHref>
          <a>@{post.username}</a>
        </Link>{' '}
        on <time dateTime={createdAt}>{format(createdAt, 'dd/MM/yyyy')}</time>
      </Subtitle>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </>
  );
};

export default PostContent;
