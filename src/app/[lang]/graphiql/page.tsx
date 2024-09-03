import React from 'react';
import { Metadata } from 'next';
import GraphQLClient from '@/components/GraphQL/GraphQLClient/GraphQLClient';

export const metadata: Metadata = {
  title: 'GraphQL Client',
  description: 'About GraphQL Client',
  icons: {
    icon: '/favicon.png',
  },
};

const SigninPage: React.FC = () => {
  return <GraphQLClient />;
};

export default SigninPage;
