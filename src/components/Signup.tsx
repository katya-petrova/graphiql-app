'use client';
import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { Form } from './Form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '../firebase';
import { useRouter } from 'next/navigation';

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) alert('Please enter name'); //
    console.log(name, email, password);

    try {
      registerWithEmailAndPassword(name, email, password);
    } catch (error) {
      console.log(error);
    }

    setName('');
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) router.push('/restclient');
  }, [user, loading, router]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
      <Form onSubmit={register}>
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-2 text-gray-700">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
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
        <Button type="submit">Sign Up</Button>
      </Form>
    </>
  );
};

export default Signup;
