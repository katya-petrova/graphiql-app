'use client';
import React, { useEffect } from 'react';
import { auth, logout } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { Button } from './Button';

const Restclient: React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/signin');
  }, [user]);

  const handleSignOut = async () => {
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Rest Client</h1>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

export default Restclient;
