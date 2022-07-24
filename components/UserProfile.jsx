import React, { useState } from 'react';
import {
  Avatar,
  Heading,
  VStack,
  Text,
  Button,
  HStack,
} from '@chakra-ui/react';
import { useAuth } from '@lib/auth';
import { UsernameForm } from './UsernameForm';

const UserProfile = ({ user, admin }) => {
  const auth = useAuth();

  if (!user) return 'Loading...';

  return (
    <HStack
      pt={6}
      spacing={8}
      pb={{
        base: 2,
        md: 6,
      }}
    >
      {user && (
        <Avatar
          size='xl'
          src={user?.photoURL || user?.photoUrl}
          name={user.displayName}
        />
      )}
      <VStack align='start'>
        <Heading>{user.displayName || user.name}</Heading>
        <Text
          textAlign='center'
          fontSize='sm'
          fontWeight='semibold'
          color='gray.500'
        >
          {user.username}
        </Text>
        {admin && <AdminUserPanel auth={auth} />}
      </VStack>
    </HStack>
  );
};

export default UserProfile;

export const AdminUserPanel = ({ auth }) => {
  const [editingUsername, setEditingUsername] = useState(false);
  return (
    <VStack w='full' justify='start' align='start'>
      <HStack>
        <Button
          variant='outline'
          borderColor='gray.400'
          onClick={() => setEditingUsername(state => !state)}
        >
          {editingUsername ? 'Cancel' : 'Edit Username'}
        </Button>
        <Button
          colorScheme='teal'
          borderColor='gray.400'
          onClick={() => auth.signout()}
        >
          Logout
        </Button>
      </HStack>
      {editingUsername && <UsernameForm />}
    </VStack>
  );
};
