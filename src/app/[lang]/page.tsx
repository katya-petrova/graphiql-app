import Welcome from '@/pagesComponents/Welcome/Welcome';
import { getDictionary, Locale } from '@/utils/translation/getDictionary';
import React from 'react';

type HomePageProps = {
  params: {
    lang: Locale;
  };
};

const HomePage = async ({ params: { lang } }: HomePageProps) => {
  const { welcome, auth } = await getDictionary(lang);

  return (
    <div>
      <Welcome t={{ welcome, auth }} />
    </div>
  );
};

export default HomePage;
