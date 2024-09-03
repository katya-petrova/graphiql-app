'use client';

import { useAuth } from '@/context/AuthContext';
import { Dictionary } from '@/utils/translation/getDictionary';
import { Link } from '@/components/Link';

type WelcomeProps = { t: Pick<Dictionary, 'welcome' | 'auth'> };

const Welcome = ({ t }: WelcomeProps) => {
  const { isSignedIn } = useAuth();

  return (
    <>
      <section className="max-w-2xl text-base md:text-lg text-gray-400 space-y-6">
        <h1>{t.welcome.title}</h1>
        {t.welcome.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>
      <div className="flex justify-center mt-20">
        {isSignedIn ? (
          <Link href={'/main'} variant="primary">
            {t.welcome.link}
          </Link>
        ) : (
          <Link href={'/signin'} variant="primary">
            {t.auth.links.signIn}
          </Link>
        )}
      </div>
    </>
  );
};

export default Welcome;
