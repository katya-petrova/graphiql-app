import React from 'react';
import { Metadata } from 'next';
import { History } from '@/pagesComponents/history/History';
import { getDictionary, Locale } from '@/utils/translation/getDictionary';

export const metadata: Metadata = {
  title: 'History Requests',
  description: 'History Requests',
  icons: {
    icon: '/favicon.png',
  },
};

type HomePageProps = {
  params: {
    lang: Locale;
  };
};

const HistoryPage = async ({ params: { lang } }: HomePageProps) => {
  const { history } = await getDictionary(lang);

  return <History t={history} />;
};

export default HistoryPage;
