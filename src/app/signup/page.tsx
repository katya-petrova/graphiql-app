import React from 'react';
import { Metadata } from 'next';
import ToastContainer from '@/components/ToastContainer/ToastContainer';
import Signup from '@/components/Signup/Signup';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account.',
  icons: {
    icon: '/favicon.png',
  },
};

const SignupPage: React.FC = () => {
  return (
    <>
      <Signup />
      <ToastContainer />
    </>
  );
};

export default SignupPage;
