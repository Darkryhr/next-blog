import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCuiFHeI7dIRz1VPtD1G3zbRYhPWmLtVeQ',
  authDomain: 'gab-portfolio.firebaseapp.com',
  projectId: 'gab-portfolio',
  storageBucket: 'gab-portfolio.appspot.com',
  messagingSenderId: '566485505494',
  appId: '1:566485505494:web:40acf4a053014d5d8e8077',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const storage = firebase.storage();
export const firestore = firebase.firestore();
