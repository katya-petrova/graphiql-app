'use client';
import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { Form } from './Form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '../firebase';
import { useRouter } from 'next/navigation';
import Loader from './Loader/Loader';
import { validateSignupForm } from '@/utils/validation';

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, loading, error] = useAuthState(auth);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { isValid, errors } = validateSignupForm({ name, email, password });

    if (!isValid) {
      setErrors(errors);
      return;
    }

    try {
      await registerWithEmailAndPassword(name, email, password);

      router.push('/restclient');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) router.push('/restclient');
  }, [user, loading, router]);

  if (loading) {
    return <Loader />;
  }

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
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
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
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <Button type="submit">Sign Up</Button>
      </Form>
    </>
  );
};

export default Signup;
