import React from 'react';
import { Metadata } from 'next';
import Restclient from '@/pagesComponents/Restclient/Restclient';

export const metadata: Metadata = {
  title: 'RESTfull Client',
  description: 'About RESTfull Client',
  icons: {
    icon: '/favicon.png',
  },
};

const SigninPage: React.FC = () => {
  return <Restclient />;
};

export default SigninPage;
