import React, { useState } from 'react';
import {
  Avatar,
  Heading,
  VStack,
  Text,
  Button,
  HStack,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react';
import { useAuth } from '@lib/auth';
import { UsernameForm } from './UsernameForm';

const UserProfile = ({ user, admin }) => {
  const auth = useAuth();

  if (!user) return <UserProfileSkeleton />;

  return admin ? (
    //* for account management
    <AdminUserPanel auth={auth} />
  ) : (
    //* for external user view
    <UserProfilePanel user={user} />
  );
};

export default UserProfile;

export const AdminUserPanel = ({ auth }) => {
  const [editingUsername, setEditingUsername] = useState(false);
  return (
    <HStack
      pt={6}
      spacing={8}
      pb={{
        base: 2,
        md: 6,
      }}
    >
      {auth.user && (
        <Avatar size='xl' src={auth.user?.photoURL} name={auth.user.name} />
      )}
      <VStack align='start'>
        <Heading>{auth.user.name || user.name}</Heading>
        <Text
          textAlign='center'
          fontSize='sm'
          fontWeight='semibold'
          color='gray.500'
        >
          {auth.user.username}
        </Text>
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
      </VStack>
    </HStack>
  );
};

export const UserProfilePanel = ({ user }) => (
  <HStack
    pt={6}
    spacing={8}
    pb={{
      base: 2,
      md: 6,
    }}
  >
    <VStack align='center' mx='auto'>
      {user && (
        <Avatar size='xl' src={user?.photoURL} name={user.displayName} />
      )}
      <Heading>{user.displayName || user.name}</Heading>
      <Text
        textAlign='center'
        fontSize='sm'
        fontWeight='semibold'
        color='gray.500'
      >
        {user.username}
      </Text>
    </VStack>
  </HStack>
);

export const UserProfileSkeleton = () => (
  <HStack
    pt={6}
    spacing={8}
    pb={{
      base: 2,
      md: 6,
    }}
  >
    <SkeletonCircle size={24} />
    <VStack align='start'>
      <Heading>
        <Skeleton h={10} w='xs' mb={2} />
      </Heading>
      <Text
        textAlign='center'
        fontSize='sm'
        fontWeight='semibold'
        color='gray.500'
      >
        <Skeleton h={5} w={20} />
      </Text>
    </VStack>
  </HStack>
);
