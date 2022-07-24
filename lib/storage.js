import { storage } from './firebase';
import { getDownloadURL, ref } from 'firebase/storage';

export function createUserUploadRef(uid, extension) {
  return ref(storage, `uploads/${uid}/${Date.now()}.${extension}`);
}

export async function getFileUrl(fileRef) {
  return await getDownloadURL(ref(storage, fileRef));
}
