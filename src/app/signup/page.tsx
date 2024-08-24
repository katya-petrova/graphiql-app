import React from 'react';
import { Metadata } from 'next';
import Signup from '@/components/Signup';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account.',
  icons: {
    icon: '/favicon.png',
  },
};

const SignupPage: React.FC = () => {
  return <Signup />;
};

export default SignupPage;
