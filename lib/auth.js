import React, { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import Cookies from 'js-cookie';
import { checkUserExists, createUser, getUserbyId } from './db';
import { auth } from './firebase';

const authContext = createContext();

export const useAuth = () => useContext(authContext);

export function AuthProvider({ children }) {
  const authData = useProvideAuth();
  return (
    <authContext.Provider value={authData}>{children}</authContext.Provider>
  );
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = async rawUser => {
    if (rawUser) {
      let user;
      const userExists = await checkUserExists(rawUser.uid);
      if (userExists) user = await getUserbyId(rawUser.uid);
      else user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      createUser(user.uid, userWithoutToken);
      setUser(user);
      Cookies.set('str-auth', true, {
        expires: 1,
      });
      return user;
    } else {
      setUser(false);
      Cookies.remove('str-auth');
      return false;
    }
  };

  const signinWithGithub = () => {
    Router.push('/');

    return signInWithPopup(auth, new GithubAuthProvider()).then(res => {
      handleUser(res.user);
    });
  };

  const signinWithGoogle = () => {
    Router.push('/');

    return signInWithPopup(auth, new GoogleAuthProvider()).then(res => {
      handleUser(res.user);
    });
  };

  const signout = () => {
    Router.push('/');
    signOut(auth).then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signinWithGoogle,
    signout,
  };
}

const formatUser = async user => {
  const token = await user.getIdToken();

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoURL: user.photoURL,
    token,
    username: user.email.split('@')[0],
  };
};
