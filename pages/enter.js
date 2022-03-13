import React, { useCallback, useState, useEffect } from 'react';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { UserContext } from '../lib/context';
import { useContext } from 'react';
import { debounce } from 'lodash';
import { StrokedButton } from '../components/styled/shared';
import styled from 'styled-components';

const EnterPage = props => {
  const { user, username } = useContext(UserContext);

  return (
    <Main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          'You are already logged in!'
        )
      ) : (
        <SignInButton />
      )}
    </Main>
  );
};

export default EnterPage;

const SignInButton = () => {
  const signInGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return <StrokedButton onClick={signInGoogle}>Sign In</StrokedButton>;
};
const SignOutButton = () => {
  return <StrokedButton onClick={() => auth.signOut()}>Sign Out</StrokedButton>;
};
const UsernameForm = () => {
  const [formValue, setFormValue] = useState('');
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

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
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        setValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  const onSubmit = async e => {
    e.preventDefault();

    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name='username'
            placeholder='username'
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={valid}
            loading={loading}
          />

          <StrokedButton type='submit' disabled={!valid}>
            Submit
          </StrokedButton>

          <h3>Debug state</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Valid?: {valid.toString()}
          </div>
        </form>
      </section>
    )
  );
};

const UsernameMessage = ({ username, isValid, loading }) => {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p>{username} is available!</p>;
  } else if (username && !isValid) {
    return <p>That username is taken!</p>;
  } else {
    return <p></p>;
  }
};

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
