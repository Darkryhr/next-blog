import React from 'react';
import Link from 'next/link';
import { Card, CardFooter } from './styled/Card';
import { Subtitle, Title, Info } from './styled/shared';

const PostFeed = ({ posts, admin }) => {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
};

const PostItem = ({ post }) => {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <Card>
      <Link href={`/${post.username}`}>
        <a>
          <Subtitle>By @{post.username}</Subtitle>
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`} passHref>
        <Title>
          <a>{post.title}</a>
        </Title>
      </Link>
      <CardFooter>
        <Info>
          {wordCount} words. {minutesToRead} min read
        </Info>
        <span>💗 {post.heartCount || 0} Hearts</span>
      </CardFooter>
    </Card>
  );
};

export default PostFeed;
