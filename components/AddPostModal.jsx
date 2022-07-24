import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/auth';
import kebabCase from 'lodash.kebabcase';
import {
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  FormControl,
  FormHelperText,
  Input,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  ModalFooter,
} from '@chakra-ui/react';
import { serverTimestamp } from 'firebase/firestore';

import { createUserPost } from '@lib/db';

const AddPostModal = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ensure url is safe
  const slug = encodeURI(kebabCase(title));

  //Validate length
  const isValid = title.length > 3 && title.length < 100;

  const createPost = async e => {
    e.preventDefault();
    const uid = user.uid;

    const data = {
      title,
      slug,
      uid,
      username: user.username,
      userPhoto: user.photoURL,
      published: false,
      content: '# hello world',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await createUserPost(uid, slug, data);
    onClose();
    router.push(`/account/${slug}`);
  };

  return (
    <>
      <Button
        ml={4}
        onClick={onOpen}
        backgroundColor='gray.900'
        color='white'
        fontWeight='medium'
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
      >
        Create
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as='form' onSubmit={createPost}>
          <ModalHeader fontWeight='bold'>New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                variant='filled'
              />
              <FormHelperText>No Clickbait please</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight='medium'>
              Cancel
            </Button>
            <Button
              disabled={!isValid}
              colorScheme='teal'
              fontWeight='medium'
              type='submit'
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPostModal;
