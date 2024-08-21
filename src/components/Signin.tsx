'use client';
import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { Form } from './Form';
import { auth, logInWithEmailAndPassword } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import Loader from './Loader/Loader';

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

    if (!email) alert('Please enter email'); //
    console.log(email, password);

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
