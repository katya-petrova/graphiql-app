import Welcome from '@/components/Welcome/Welcome';
import { getDictionary, Locale } from '@/utils/translation/getDictionary';
import React from 'react';

const HomePage = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const t = await getDictionary(lang);

  return (
    <div>
      <Welcome t={t} />
    </div>
  );
};

export default HomePage;
