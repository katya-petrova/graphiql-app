import {
  collection,
  query,
  getDocs,
  where,
  addDoc,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

const getUserDocs = async (
  uid: string
): Promise<QuerySnapshot<DocumentData>> => {
  const q = query(collection(db, 'users'), where('uid', '==', uid));
  return await getDocs(q);
};

const addUserDoc = async (user: {
  uid: string;
  name: string;
  authProvider: string;
  email: string;
}) => {
  await addDoc(collection(db, 'users'), user);
};

export { getUserDocs, addUserDoc };
