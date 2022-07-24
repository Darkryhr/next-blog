import React from 'react';
import NextLink from 'next/link';
import {
  Flex,
  Link,
  Button,
  Text,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineLogin,
  AiOutlineLogout,
} from 'react-icons/ai';
import { useAuth } from '../lib/auth';
import { LogoIcon } from './Logo';
import AddPostModal from './AddPostModal';

const Navbar = () => {
  const auth = useAuth();
  return (
    <Flex
      w='full'
      backgroundColor='gray.100'
      borderBottom='1px'
      borderColor='gray.200'
      display={{ base: 'none', md: 'flex' }}
    >
      <Flex
        alignItems='center'
        justifyContent='space-between'
        maxW='container.xl'
        margin='0 auto'
        w='full'
        px={4}
        py={2}
      >
        <Flex align='center'>
          <NextLink href='/' passHref>
            <Link>
              <LogoIcon w={12} h={12} />
            </Link>
          </NextLink>
        </Flex>
        <Flex justifyContent='center' alignItems='center'>
          {auth.user ? (
            <>
              <UserDropdown auth={auth} />
              <AddPostModal />
            </>
          ) : (
            <NextLink href='/login' passHref>
              <Button colorScheme='purple'>Sign In</Button>
            </NextLink>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;

const UserDropdown = ({ auth }) => {
  return (
    <Menu>
      <MenuButton
        as={Avatar}
        cursor='pointer'
        size='sm'
        src={auth.user?.photoURL}
      />

      <MenuList>
        <NextLink href='/account' passHref>
          <MenuItem icon={<AiOutlineUser />} as={Link}>
            Account
          </MenuItem>
        </NextLink>
        <MenuItem icon={<AiOutlineLogout />} onClick={() => auth.signout()}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export const MobileDashboard = () => {
  const auth = useAuth();
  return (
    <>
      <Box h={24} display={{ base: 'block', md: 'none' }}></Box>
      <Flex
        bg='white'
        w='full'
        position='fixed'
        zIndex={10}
        h='24'
        bottom={0}
        align='center'
        justify='space-around'
        borderWidth={1}
        borderTopColor='gray.200'
        display={{ base: 'flex', md: 'none' }}
      >
        <NextLink href='/' passHref>
          <Flex
            direction='column'
            justify='center'
            align='center'
            flex={1}
            position='relative'
          >
            <IconButton
              variant='ghost'
              icon={
                <AiOutlineHome
                  size={28}
                  style={{
                    marginBottom: '0.5rem',
                  }}
                />
              }
              width='full'
              h='24'
            />
            <Text
              position='absolute'
              fontSize='sm'
              fontWeight='semibold'
              color='gray.500'
              top={16}
            >
              Home
            </Text>
          </Flex>
        </NextLink>
        <NextLink href='/account' passHref>
          <Flex
            direction='column'
            justify='center'
            align='center'
            flex={1}
            position='relative'
          >
            <IconButton
              variant='ghost'
              icon={
                <AiOutlineUser
                  size={28}
                  style={{
                    marginBottom: '0.5rem',
                  }}
                />
              }
              width='full'
              h='24'
              borderWidth={1}
              borderLeftColor='gray.200'
              borderRightColor='gray.200'
            />
            <Text
              position='absolute'
              fontSize='sm'
              fontWeight='semibold'
              color='gray.500'
              top={16}
            >
              Account
            </Text>
          </Flex>
        </NextLink>
        {/* TODO: replace w/ back button */}
        <Flex
          direction='column'
          justify='center'
          align='center'
          flex={1}
          position='relative'
        >
          {auth.user ? (
            <>
              <IconButton
                onClick={() => auth.signout()}
                variant='ghost'
                icon={
                  <AiOutlineLogout
                    size={28}
                    style={{
                      marginBottom: '0.5rem',
                    }}
                  />
                }
                width='full'
                h='24'
              />
              <Text
                position='absolute'
                fontSize='sm'
                fontWeight='semibold'
                color='gray.500'
                top={16}
              >
                Logout
              </Text>
            </>
          ) : (
            <NextLink href='/login' passHref>
              <>
                <IconButton
                  variant='ghost'
                  icon={
                    <AiOutlineLogin
                      size={28}
                      style={{
                        marginBottom: '0.5rem',
                      }}
                    />
                  }
                  width='full'
                  h='24'
                />
                <Text
                  position='absolute'
                  fontSize='sm'
                  fontWeight='semibold'
                  color='gray.500'
                  top={16}
                >
                  Login
                </Text>
              </>
            </NextLink>
          )}
        </Flex>
      </Flex>
    </>
  );
};
