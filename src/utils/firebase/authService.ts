import { toast } from 'react-toastify';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { auth } from './firebaseConfig';
import { db } from './firebaseConfig';
import { collection, query, getDocs, where, addDoc } from 'firebase/firestore';

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async (): Promise<void> => {
  try {
    const res: UserCredential = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err: any) {
    console.error(err);
    toast.error(err.message);
  }
};

const logInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    console.error(err);
    toast.error(err.message);
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  try {
    const res: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err: any) {
    console.error(err);
    toast.error(err.message);
  }
};

const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success('Password reset link sent!');
  } catch (err: any) {
    console.error(err);
    toast.error(err.message);
  }
};

const logout = (): void => {
  signOut(auth);
};

export {
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
