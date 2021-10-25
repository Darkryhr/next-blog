import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Subtitle, Title } from './styled/shared';
import moment from 'moment';

const PostContent = ({ post }) => {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt.toDate();
  return (
    <div>
      <Title>{post.title}</Title>
      <Subtitle>
        Written by{' '}
        <Link href={`/${post.username}/`} passHref>
          @{post.username}
        </Link>{' '}
        on {moment(createdAt).format('MMMM Do YYYY')}
      </Subtitle>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
};

export default PostContent;
