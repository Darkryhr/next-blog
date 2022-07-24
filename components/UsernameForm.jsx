import React, { useEffect, useState, useCallback } from 'react';
import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  IconButton,
  useToast,
  Text,
} from '@chakra-ui/react';
import { AiOutlineCheck } from 'react-icons/ai';
import debounce from 'lodash.debounce';
import { useAuth } from '@lib/auth';
import { changeUsername, doesUsernameExist } from '@lib/db';

export const UsernameForm = () => {
  const auth = useAuth();
  const toast = useToast();
  const [formValue, setFormValue] = useState(auth.user.username);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const onChange = e => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setValid(false);
    }
  };

  const checkUsername = useCallback(
    debounce(async username => {
      if (username.length >= 3) {
        const exists = await doesUsernameExist(username);
        setValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await changeUsername(auth.user.uid, formValue, auth.user.username);
      toast({
        title: 'Done!',
        description: 'Your username was successfully updated',
        status: 'success',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex as='form' onSubmit={onSubmit} w='full'>
      <FormControl>
        <FormLabel>Edit Username</FormLabel>
        <Flex>
          <Input
            bg='white'
            name='username'
            placeholder='username'
            value={formValue}
            onChange={onChange}
          />
          <IconButton
            type='submit'
            disabled={!valid}
            icon={<AiOutlineCheck size={20} />}
            colorScheme='teal'
            ml={2}
          />
        </Flex>

        <UsernameMessage
          username={formValue}
          isValid={valid}
          loading={loading}
        />
      </FormControl>
    </Flex>
  );
};

const UsernameMessage = ({ username, isValid, loading }) => {
  if (loading) {
    return (
      <Text mt={1} fontSize='sm' color='gray.500'>
        Checking...
      </Text>
    );
  } else if (isValid) {
    return (
      <Text mt={1} fontSize='sm' color='green.500'>
        {username} is available!
      </Text>
    );
  } else if (username && !isValid) {
    return (
      <Text mt={1} fontSize='sm' color='red.500'>
        That username is taken!
      </Text>
    );
  } else {
    return '';
  }
};
