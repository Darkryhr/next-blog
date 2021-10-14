import { auth, firestore } from './firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
export const useUserData = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (user) {
      console.log('REACHED USERNAME CHECK');
      const ref = firestore.collection('users').doc(user.uid);
      ref.onSnapshot((doc) => {
        console.log(doc);
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }
  }, [user]);

  return { user, username };
};
