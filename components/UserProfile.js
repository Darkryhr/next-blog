import React from 'react';
import styled from 'styled-components';
import { Subtitle, Title } from './styled/shared';
import { auth } from '../lib/firebase';
import { LogoutButton } from '../components/styled/shared';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

const UserProfile = ({ user }) => {
  const { username } = useContext(UserContext);
  console.log(username);
  return (
    <ProfileWrapper>
      <ProfileImage src={user?.photoURL} alt='avatar' />
      <InfoWrapper>
        <p>
          <Subtitle>@{user.username}</Subtitle>
        </p>
        <Title>{user.displayName}</Title>
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
  border-radius: 50px;
  margin: 1em 0;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.4em;
`;
