import React from 'react';
import styled from 'styled-components';
import { Heading1, Subtitle } from './styled/shared';
import { auth } from '../lib/firebase';
import { LogoutButton } from '../components/styled/shared';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

const UserProfile = ({ user }) => {
  const { username } = useContext(UserContext);
  return (
    <ProfileWrapper>
      {user?.photoURL ? (
        <ProfileImage src={user?.photoURL} alt='avatar' />
      ) : (
        <Placeholder>
          <Heading1>{user.username.slice(0, 1)}</Heading1>
        </Placeholder>
      )}
      <InfoWrapper>
        <Subtitle>@{user.username}</Subtitle>
        <Heading1 style={{ padding: 0 }}>{user.displayName}</Heading1>
        {username === user.username ? (
          <LogoutButton onClick={() => auth.signOut()}>Logout</LogoutButton>
        ) : (
          ''
        )}
      </InfoWrapper>
    </ProfileWrapper>
  );
};

export default UserProfile;

const ProfileImage = styled.img`
  border-radius: 16px;
  width: 100px;
  height: 100px;
`;

const Placeholder = styled.div`
  border-radius: 16px;
  width: 100px;
  height: 100px;
  background-color: #fff;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 2rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 1.4em;
  height: 100px;
`;
