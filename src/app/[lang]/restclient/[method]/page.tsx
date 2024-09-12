import React from 'react';
import { Metadata } from 'next';
import Restclient from '@/pagesComponents/Restclient/RestClient';
import { getDictionary } from '@/utils/translation/getDictionary';

export const metadata: Metadata = {
  title: 'RESTfull Client',
  description: 'Access the RESTfull Client',
  icons: {
    icon: '/favicon.png',
  },
};

type RestClientProps = {
  params: { lang: string };
};

const RestClient: React.FC<RestClientProps> = async ({ params: { lang } }) => {
  const { rest } = await getDictionary(lang);
  return <Restclient t={rest} />;
};

export default RestClient;
