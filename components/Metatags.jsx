import Head from 'next/head';
import React from 'react';

const Metatags = ({
  title = 'NXT Blog',
  description = 'My Blog',
  image = 'https://c.pxhere.com/images/d2/f0/97ed7946b89be6bbdde274f11d65-1457765.jpg!d',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content='@GabrielAintReal' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
    </Head>
  );
};

export default Metatags;
