import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div>
      {/* Image */}
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  );
};

export default UserProfile;
