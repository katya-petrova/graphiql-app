import Welcome from '@/components/Welcome/Welcome';
import { getDictionary, Locale } from '@/utils/translation/getDictionary';
import React from 'react';

type HomePageProps = {
  params: {
    lang: Locale;
  };
};

const HomePage = async ({ params: { lang } }: HomePageProps) => {
  const { welcome } = await getDictionary(lang);

  return (
    <div>
      <Welcome t={welcome} />
    </div>
  );
};

export default HomePage;
