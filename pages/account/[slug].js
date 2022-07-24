import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import AuthCheck from '@components/AuthCheck';
import ImageUploader from '@components/ImageUploader';
import { createPostRef, deletePost, updateUserPost } from '@lib/db';
import { useAuth } from '@lib/auth';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Switch,
  Text,
  Textarea,
  useToast,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  StackDivider,
  Divider,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const AdminEditPage = () => {
  return (
    <>
      <AuthCheck>
        <PostManager />
      </AuthCheck>
    </>
  );
};

export default AdminEditPage;

function PostManager() {
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { slug } = router.query;
  const postRef = createPostRef(user.uid, slug);

  const [post, loading, error] = useDocumentData(postRef);

  return (
    <Box as='main' maxW='container.lg' mx='auto' minH='calc(100vh)'>
      {post && (
        <Stack
          direction={{
            base: 'column',
            md: 'row',
          }}
          pt={6}
          px={{
            base: 6,
            md: 0,
          }}
        >
          <Flex direction='column' w='full' pr={8}>
            <Heading>
              {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
            </Heading>
            <Text fontSize='sm' fontWeight='semibold' mt={2} color='gray.500'>
              {post.slug}
            </Text>
            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </Flex>
          <Stack
            direction={{
              base: 'row',
              md: 'column',
            }}
            align={{
              base: 'center',
              md: 'start',
            }}
            maxW={{
              base: 'full',
              md: '32',
            }}
            justify={{
              base: 'center',
              md: 'start',
            }}
            pb={4}
            pt={4}
          >
            <Heading as='h2' fontWeight='semibold' fontSize='xl' mb={2}>
              Tools:
            </Heading>
            <Button onClick={() => setPreview(!preview)}>
              {preview ? 'Edit' : 'Preview'}
            </Button>
            <NextLink href={`/${post.username}/${post.slug}`}>
              <Button ml={2}>Live view</Button>
            </NextLink>
            <DeletePostButton postRef={postRef} />
          </Stack>
        </Stack>
      )}
    </Box>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const router = useRouter();
  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues,
    mode: 'onChange',
  });
  const toast = useToast();

  const { isValid, isDirty, errors } = formState;
  const updatePost = async ({ content, published }) => {
    await updateUserPost(postRef, content, published);

    reset({ content, published });

    router.push('/account');

    toast({
      title: 'Done!',
      description: 'Your post was successfully updated',
      status: 'success',
    });
  };

  return (
    <Box mt={4}>
      {preview && <ReactMarkdown>{watch('content')}</ReactMarkdown>}
      <Box display={preview ? 'none' : 'block'}>
        <form onSubmit={handleSubmit(updatePost)}>
          <ImageUploader />
          <Textarea
            bg='white'
            resize='vertical'
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
          ></Textarea>

          {errors.content && <p>{errors.content.message}</p>}

          <FormControl display='flex' alignItems='center' mt={4}>
            <FormLabel mb='0' htmlFor='checkbox'>
              Published
            </FormLabel>
            <Switch id='checkbox' {...register('published')} size='md' />
          </FormControl>
          <Button mt={2} type='submit' disabled={!isValid || !isDirty}>
            Save Changes
          </Button>
        </form>
      </Box>
    </Box>
  );
}

const DeletePostButton = ({ postRef }) => {
  const router = useRouter();
  const toast = useToast();
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Delete</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Are you sure?</PopoverHeader>
        <PopoverBody>This will permanently delete your post</PopoverBody>
        <PopoverFooter>
          <Button
            colorScheme='red'
            onClick={async () => {
              await deletePost(postRef);
              router.push('/account');
              toast({
                title: '🗑️ Post deleted',
                status: 'success',
              });
            }}
          >
            Yes
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
