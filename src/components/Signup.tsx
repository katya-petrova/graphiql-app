'use client';
import React, { useEffect, useState } from 'react';
import { Button } from './Button/Button';
import { Form } from './Form/Form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import Loader from './Loader/Loader';
import { validateSignupForm } from '@/utils/validation';
import { toast } from 'react-toastify';
import { auth } from '@/utils/firebase/firebaseConfig';
import { registerWithEmailAndPassword } from '@/utils/firebase/authService';

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, loading] = useAuthState(auth);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { isValid, errors } = validateSignupForm({ name, email, password });

    if (!isValid) {
      setErrors(errors);
      Object.values(errors).forEach((msg) => toast.error(msg));
      return;
    }

    if (!navigator.onLine) {
      toast.error(
        'You are currently offline. Please check your internet connection.'
      );
      return;
    }

    try {
      await registerWithEmailAndPassword(name, email, password);
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
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
