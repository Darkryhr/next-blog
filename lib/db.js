import {
  doc,
  setDoc,
  query,
  where,
  getDocs,
  collectionGroup,
  limit,
  orderBy,
  startAfter,
  Timestamp,
  getDoc,
  collection,
  updateDoc,
  serverTimestamp,
  writeBatch,
  increment,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { _LIMIT } from '../constants';
import { postToJSON } from './firebase';

export async function getInitialPublishedPosts() {
  const q = query(
    collectionGroup(db, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(_LIMIT)
  );

  const snapshot = await getDocs(q);

  const posts = [];

  snapshot.forEach(doc => posts.push({ id: doc.id, ...doc.data() }));

  return { posts };
}

export async function getFollowingPublishedPosts(cursor) {
  const q = query(
    collectionGroup(db, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    startAfter(cursor),
    limit(_LIMIT)
  );

  const snapshot = await getDocs(q);

  const posts = [];

  snapshot.forEach(doc => posts.push({ id: doc.id, ...doc.data() }));

  return { posts };
}

export const fromMillis = Timestamp.fromMillis;

export async function createUser(uid, data) {
  await setDoc(doc(db, 'users', uid), { uid, ...data }, { merge: true });
}

export async function getUser(username) {
  const userRef = collection(db, 'users');
  const q = query(userRef, where('username', '==', username), limit(1));
  const userDoc = await getDocs(q);
  return userDoc.docs[0];
}

export async function getUserbyId(uid) {
  const userRef = collection(db, 'users');
  const q = query(userRef, where('uid', '==', uid), limit(1));
  const userDoc = await getDocs(q);
  if (userDoc.empty) return;
  return userDoc.docs[0].data();
}

export async function getUserPosts(docRef) {
  const postsRef = collection(db, 'users', docRef, 'posts');
  const q = query(
    postsRef,
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(5)
  );

  const snapshot = await getDocs(q);

  const posts = [];

  snapshot.forEach(doc => posts.push({ id: doc.id, ...doc.data() }));

  return { posts };
}

export async function getUserPost(docRef, slug) {
  const postRef = doc(db, 'users', docRef, 'posts', slug);
  const postDoc = await getDoc(postRef);
  return {
    post: postToJSON(postDoc.data()),
    path: postRef.path,
  };
}

export async function getAllPostsSnapshot() {
  const q = query(collectionGroup(db, 'posts'));

  const snapshot = await getDocs(q);

  return snapshot;
}

export function getPostRef(path) {
  return doc(db, path);
}

export function createPostRef(uid, slug) {
  return doc(db, 'users', uid, 'posts', slug);
}

export function getUserPostsQuery(userRef) {
  return query(
    collection(db, 'users', userRef, 'posts'),
    orderBy('createdAt', 'desc')
  );
}

export async function createUserPost(uid, slug, data) {
  return await setDoc(doc(db, 'users', uid, 'posts', slug), data);
}

export async function updateUserPost(ref, content, published) {
  return await updateDoc(ref, {
    content,
    published,
    updatedAt: serverTimestamp(),
  });
}

export async function checkUsername(username) {
  const snapshot = await getDoc(doc(db, 'usernames', username));
  return snapshot.exists();
}

export async function checkUserExists(uid) {
  return (await getDoc(doc(db, 'users', uid))).exists();
}
export function getHeartRef(uid) {
  return doc(db, 'hearts', uid);
}

export async function heartPost(postRef, heartRef, uid) {
  const batch = writeBatch(db);

  batch.update(postRef, { heartCount: increment(1) });

  batch.set(heartRef, { uid });

  await batch.commit();
}

export async function unheartPost(postRef, heartRef) {
  const batch = writeBatch(db);

  batch.update(postRef, { heartCount: increment(-1) });

  batch.delete(heartRef);

  await batch.commit();
}

// export async function createRef() {}
// export async function queryDoc() {}
// export async function queryCollection() {}

export async function changeUsername(uid, newUsername, oldUsername) {
  const userRef = doc(db, 'users', uid);
  const oldUsernameRef = doc(db, 'usernames', oldUsername);
  const newUsernameRef = doc(db, 'usernames', newUsername);
  const batch = writeBatch(db);

  // update user document
  batch.update(userRef, {
    username: newUsername,
  });

  await updatePostsUsername(uid, newUsername);
  // create new username document
  batch.set(newUsernameRef, { uid });

  // delete(free up) previous username
  batch.delete(oldUsernameRef);

  await batch.commit();
}

async function updatePostsUsername(uid, newUsername) {
  const snapshot = await getDocs(collection(db, 'users', uid, 'posts'));
  snapshot.forEach(async doc => {
    await updateDoc(doc.ref, { username: newUsername });
  });
}

export async function doesUsernameExist(username) {
  return (await getDoc(doc(db, 'usernames', username))).exists();
}

export async function createUsername(uid, username) {
  await setDoc(doc(db, 'usernames', username), { uid });
}

export async function deletePost(postRef) {
  await deleteDoc(postRef);
}
