import React from 'react';
import styled from 'styled-components';
import { Subtitle, Title } from './styled/shared';

const UserProfile = ({ user }) => {
  return (
    <ProfileWrapper>
      <ProfileImage src={user?.photoURL} alt='avatar' />
      <InfoWrapper>
        <p>
          <Subtitle>@{user.username}</Subtitle>
        </p>
        <Title>{user.displayName}</Title>
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
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.4em;
`;
