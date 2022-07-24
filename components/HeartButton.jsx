import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useAuth } from '@lib/auth';
import { getHeartRef, heartPost, unheartPost } from '@lib/db';
import { Button, IconButton } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const HeartButton = ({ postRef }) => {
  const auth = useAuth();
  const heartRef = getHeartRef(auth.user.uid);
  const [heartDoc] = useDocument(heartRef);

  const addHeart = async () => {
    await heartPost(postRef, heartRef, auth.user.uid);
  };

  const removeHeart = async () => {
    await unheartPost(postRef, heartRef);
  };

  return heartDoc?.exists() ? (
    <IconButton
      icon={<AiFillHeart size={26} />}
      onClick={removeHeart}
      colorScheme='red'
      variant='ghost'
      borderRadius='full'
    />
  ) : (
    <IconButton
      icon={<AiOutlineHeart size={26} />}
      onClick={addHeart}
      colorScheme='red'
      variant='ghost'
      borderRadius='full'
    />
  );
};

export default HeartButton;
