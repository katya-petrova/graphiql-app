'use client';
import React, { useEffect, useState } from 'react';
import { Button } from './Button/Button';
import { Form } from './Form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import Loader from './Loader/Loader';
import { toast } from 'react-toastify';
import { auth } from '@/utils/firebase/firebaseConfig';
import { logInWithEmailAndPassword } from '@/utils/firebase/authService';

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/restclient');
  }, [user, loading, router]);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!navigator.onLine) {
      toast.error(
        'You are currently offline. Please check your internet connection.'
      );
      return;
    }

    try {
      await logInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
      <Form onSubmit={login}>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-2 text-gray-700">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col mb-6">
          <label htmlFor="password" className="mb-2 text-gray-700">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <Button type="submit">Sign In</Button>
      </Form>
    </>
  );
};

export default Signin;
