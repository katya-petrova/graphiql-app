import React from 'react';
import { Metadata } from 'next';
import Signin from '@/pagesComponents/Signin/Signin';
import ToastContainer from '@/components/ToastContainer/ToastContainer';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account.',
  icons: {
    icon: '/favicon.png',
  },
};

const SigninPage: React.FC = () => {
  return (
    <>
      <Signin />
      <ToastContainer />
    </>
  );
};

export default SigninPage;
