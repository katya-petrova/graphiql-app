import React from 'react';
import { Metadata } from 'next';
import MainPage from '@/components/MainPage/MainPage';

export const metadata: Metadata = {
  title: 'GraphiQL | Main',
  icons: {
    icon: '/favicon.png',
  },
};

const SigninPage: React.FC = () => {
  return <MainPage />;
};

export default SigninPage;
