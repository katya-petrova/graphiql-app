import React from 'react';
import { Metadata } from 'next';
import MainPage from '@/pagesComponents/MainPage/MainPage';
import { getDictionary, Locale } from '@/utils/translation/getDictionary';

export const metadata: Metadata = {
  title: 'GraphiQL | Main',
  icons: {
    icon: '/favicon.png',
  },
};

type SigninPageProps = {
  params: { lang: Locale };
};

const SigninPage = async ({ params: { lang } }: SigninPageProps) => {
  const { main, auth } = await getDictionary(lang);

  return <MainPage t={{ main, auth }} />;
};

export default SigninPage;
