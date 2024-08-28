'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const MainPage = () => {
  const { isSignedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/signin');
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-64 p-4">
      {isSignedIn && user ? (
        <>
          <p>Welcome to our platform. Choose the tool you need:</p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 mt-8">
            <Link
              href="/restclient"
              className="border border-blue-500 rounded px-4 py-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 transition ease-in-out duration-150 hover:bg-transparent w-64 text-center"
            >
              RESTful Client
            </Link>
            <Link
              href="/graphiql"
              className="border border-blue-500 rounded px-4 py-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 transition ease-in-out duration-150 hover:bg-transparent w-64 text-center"
            >
              GraphiQL
            </Link>
            <Link
              href="/history"
              className="border border-blue-500 rounded px-4 py-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 transition ease-in-out duration-150 hover:bg-transparent w-64 text-center"
            >
              History
            </Link>
          </div>
        </>
      ) : (
        <p>Please sign in to access the platform.</p>
      )}
    </div>
  );
};

export default MainPage;
