'use client';
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Dictionary } from '@/utils/translation/getDictionary';
import { Link } from '@/components/Link';
import { getLangFromUrlOrCookie } from '@/utils/getCurrentLanguage/getCurrentLanguage';

type MainPageProps = {
  t: Pick<Dictionary, 'main' | 'auth'>;
};

const MainPage = ({ t }: MainPageProps) => {
  const { isSignedIn, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const currentLang = getLangFromUrlOrCookie(pathname);

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/signin');
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-64 p-4">
      {isSignedIn && user ? (
        <>
          <p>{t.main.title}</p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 mt-8">
            <Link
              variant="primary"
              href={`/${currentLang}/restclient/GET`}
              className="w-64"
            >
              {t.main.links.rest}
            </Link>
            <Link variant="primary" href={`/graphiql`} className="w-64">
              {t.main.links.graphiQL}
            </Link>
            <Link variant="primary" href={`/history`} className="w-64">
              {t.main.links.history}
            </Link>
          </div>
        </>
      ) : (
        <p>{t.auth.messages.notAuth}</p>
      )}
    </div>
  );
};

export default MainPage;
