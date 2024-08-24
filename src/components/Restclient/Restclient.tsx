'use client';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { Button } from '../Button/Button';
import { auth } from '@/utils/firebase/firebaseConfig';
import { logout } from '@/utils/firebase/authService';
import { toast } from 'react-toastify';

const Restclient: React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/signin');
  }, [user, router]);

  const handleSignOut = async () => {
    try {
      logout();
    } catch (error) {
      toast.error(` Sign out error: ${error}`);
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
