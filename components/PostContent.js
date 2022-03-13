import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { LinkStyled, Subtitle, Heading1 } from './styled/shared';
import { format } from 'date-fns';

const PostContent = ({ post }) => {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <>
      <Heading1>{post.title}</Heading1>
      <Subtitle>
        Written by{' '}
        <Link href={`/${post.username}/`} passHref>
          <LinkStyled>@{post.username}</LinkStyled>
        </Link>{' '}
        on <time dateTime={createdAt}>{format(createdAt, 'dd/MM/yyyy')}</time>
      </Subtitle>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </>
  );
};

export default PostContent;
