import React from 'react';
import { Metadata } from 'next';
import Restclient from '@/components/Restclient/Restclient';

export const metadata: Metadata = {
  title: 'RESTfull Client',
  description: 'Access the RESTfull Client',
  icons: {
    icon: '/favicon.png',
  },
};

const RestClientPage: React.FC = () => {
  return <Restclient />;
};

export default RestClientPage;