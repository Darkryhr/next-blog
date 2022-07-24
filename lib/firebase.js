import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCuiFHeI7dIRz1VPtD1G3zbRYhPWmLtVeQ',
  authDomain: 'gab-portfolio.firebaseapp.com',
  projectId: 'gab-portfolio',
  storageBucket: 'gab-portfolio.appspot.com',
  messagingSenderId: '566485505494',
  appId: '1:566485505494:web:40acf4a053014d5d8e8077',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// export const increment = firebase.firestore.FieldValue.increment;
// export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

export function postToJSON(data) {
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
