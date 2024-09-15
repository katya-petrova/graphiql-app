'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { logInWithEmailAndPassword } from '@/utils/firebase/authService';
import { Form } from '@/components/Form/Form';
import Loader from '@/components/Loader/Loader';
import { auth } from '@/utils/firebase/firebaseConfig';
import { Button } from '@/components/Button';
import { useTranslation } from '@/context/TranslationContext';

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { signIn } = useTranslation();

  useEffect(() => {
    if (user) router.push('/main');
  }, [user, loading, router]);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!navigator.onLine) {
      toast.error(signIn.errorMessages.offline);
      return;
    }

    try {
      await logInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">{signIn.title}</h1>
      <Form onSubmit={login}>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-2 text-gray-700">
            {signIn.email}:
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
            {signIn.password}:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <Button type="submit">{signIn.title}</Button>
      </Form>
    </>
  );
};

export default Signin;
