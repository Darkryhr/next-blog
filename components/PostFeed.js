import React from 'react';
import Link from 'next/link';
import { Card, CardFooter } from './styled/Card';
import { Subtitle, Title, Info } from './styled/shared';
import { BiHeart } from 'react-icons/bi';
import styled from 'styled-components';

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
        <HeartSpan>
          <BiHeart size={20} />
          {post.heartCount || 0}
        </HeartSpan>
      </CardFooter>
    </Card>
  );
};

export default PostFeed;

const HeartSpan = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 2.5vw;
`;
