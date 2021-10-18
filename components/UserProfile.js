import React from 'react';
import styled from 'styled-components';
import { Subtitle, Title } from './styled/shared';

const UserProfile = ({ user }) => {
  return (
    <div>
      <ProfileImage src={user?.photoURL} alt='avatar' />
      <p>
        <Subtitle>@{user.username}</Subtitle>
      </p>
      <Title>{user.displayName}</Title>
    </div>
  );
};

export default UserProfile;

const ProfileImage = styled.img`
  border-radius: 50px;
  margin: 1em 0;
`;
